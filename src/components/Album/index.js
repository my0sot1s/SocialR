import React from 'react'
import {
  View, FlatList, Image,
  Dimensions, Text, ImageBackground, ScrollView
} from 'react-native'
import Button from '../../lib/commons/Button'
import { H2, H3 } from '../../lib/commons/H'
import EditTextHighlight from '../../lib/commons/EditText'
import AsyncImage from '../../lib/commons/AsyncImage'
import { fetchAlbum, createAlbum } from '../../api/album'
import { connect } from 'react-redux'
import { getOwnerID } from '../../store/auth'
import { flexCenter } from '../../lib/commons/themes'
import Icon from 'react-native-vector-icons/Ionicons'
import LPModal from '../DetailModal'
import ImagePicker from 'react-native-image-picker'
import { uploadSingleImage, uploadImageFiles } from '../../api/upload'
import Modal from 'react-native-modal'
import Loading from '../../lib/commons/Loading'
let { width, height } = Dimensions.get('screen')

class ChildAlbum extends React.PureComponent {
  render() {
    let { data } = this.props

    return (
      <FlatList
        ListHeaderComponent={() =>
          <View style={{ flex: 1 }}>
            <H3 text={data.album_name} style={{ paddingLeft: 5 }} />
          </View>}
        data={data.album_media}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        renderItem={({ item }) =>
          <Button style={{ padding: 0, margin: 0 }}
            activiOpacity={1}
            onLongPress={this.props.longPress.bind(this, item)}
          >
            <AsyncImage
              source={{ uri: item.url }}
              style={{
                width: width / 4 - 2,
                height: width / 4,
                padding: 2,
                borderColor: '#fff',
                borderRightWidth: 2
              }}
              resizeMode='cover' />
          </Button>
        }
      />)
  }
}

class Album extends React.PureComponent {
  constructor(props) {
    super(props)
    this.uploadImageToAlbum = this.uploadImageToAlbum.bind(this)
    this.albumName = 'no.name'
  }
  state = {
    data: [],
    isVisible: false,
    selected: {},
    uploading: false,
    albumname: '',
    createAlbumNow: false,
    listImageCreateAlbum: []
  }

  async componentDidMount() {
    this.pickerAvatar = this.pickerAvatar.bind(this)
    let albumData = await fetchAlbum(this.props.uid, -100, '')
    this.setState({
      data: albumData.albums
    })
  }
  async uploadImageToAlbum() {
    let { albumname, listImageCreateAlbum } = this.state
    if (!albumname) return
    this.setState({
      uploading: true
    })

    let mediasUploaded = await uploadImageFiles(listImageCreateAlbum)
    let res = await createAlbum(albumname, this.props.uid, mediasUploaded)
    let albumData = await fetchAlbum(this.props.uid, -100, '')
    this.setState({
      data: albumData.albums,
      uploading: false,
      listImageCreateAlbum: [],
      createAlbumNow: false
    })
  }
  async pickerAvatar() {
    let options = {
      title: 'Select Image',
      customButtons: [
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    await ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        this.setState({
          uploading: true
        })
        let source = { uri: response.uri }
        // if (!checkImage(response.uri)) return
        let imageData = {
          uri: response.origURL,
          filename: response.fileName
        }
        this.setState(prev => {
          return {
            listImageCreateAlbum: [imageData, ...prev.listImageCreateAlbum]
          }
        })
      }
    })
  }
  longPress(item) {
    this.setState({
      isVisible: true,
      selected: item
    })
    setTimeout(() => {
      this.setState({
        isVisible: false,
        selected: {}
      })
    }, 2500)
  }
  render() {
    // array of array
    let { data, selected, isVisible, createAlbumNow, listImageCreateAlbum } = this.state
    let list = listImageCreateAlbum.map((v, i) => {
      return <AsyncImage
        source={{ uri: v.uri }}
        key={i}
        style={{
          width: width / 3 - 2,
          height: width / 3,
          padding: 2,
          marginHorizontal: 4,
          borderColor: '#fff',
          borderRightWidth: 2
        }}
        resizeMode='cover' />
    })
    return (
      <View style={{ flex: 1, paddingLeft: 1 }}>
        <LPModal isVisible={isVisible}
          selected={selected}>
        </LPModal>
        <Modal isVisible={this.state.uploading}>
          <Loading type='ThreeBounce' style={{ backgroundColor: 'transparent' }} />
        </Modal>
        {/* create new */}
        <Modal isVisible={createAlbumNow}>
          <View style={{
            flex: 1, backgroundColor: '#fff',
            position: 'absolute', top: 0.2 * height,
            left: 0,
            height: 0.7 * height,
            width: width - 40,
            padding: 5
          }}>
            <H3 text={"Album Name:".toUpperCase()} style={{
              marginVertical: 10,
              color: '#ccc',
              fontFamily: 'Helvetica'
            }} />
            <EditTextHighlight
              onChangeText={(text) => this.setState({ albumname: text })}
              autoCapitalize='none'
              placeholder="Your album name..."
              addition={{
                padding: 8, fontSize: 16,
                marginVertical: 3,
                marginBottom: 5
              }}
              value={this.state.albumname}
            />
            <Button style={[flexCenter, {
              width: width / 4, height: width / 4,
              borderWidth: 1, borderColor: '#eee',
              backgroundColor: '#eee'
            }]} onPress={this.pickerAvatar.bind(this)}>
              <Icon name="ios-add" size={30} />
            </Button>
            <ScrollView horizontal style={{ height: width / 3, marginVertical: 5 }}>
              {list}
            </ScrollView>
            <Button style={[flexCenter, {
              // flexBasis: '80%',
              padding: 5,
              marginTop: 7,
              width: 0.8 * width,
              marginHorizontal: 10,
              borderRadius: 5,
              height: 0.07 * height,
              backgroundColor: '#42b9f4'
            }]}
              onPress={this.uploadImageToAlbum.bind(this)}>
              <Text style={{ fontSize: 15, color: '#5b5b5b' }} >Create</Text>
            </Button>
          </View>
        </Modal>
        <FlatList
          ListHeaderComponent={() =>
            <View style={{ height: width / 4 }}>
              <Button style={[flexCenter, {
                width: width / 4, height: width / 4,
                borderWidth: 1, borderColor: '#eee',
                backgroundColor: '#eee'
              }]} onPress={() => this.setState({ createAlbumNow: true })}>
                <Icon name="ios-add" size={30} />
              </Button>
            </View>}
          data={data}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ChildAlbum
            data={item}
            longPress={this.longPress.bind(this)}
            {...this.props} />}
        />
      </View >
    )
  }
}
let mapStateToProps = state => {
  return {
    // ownerId: getOwnerID(state)
  }
}

export default connect(mapStateToProps)(Album)