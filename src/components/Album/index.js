import React from 'react'
import { View, FlatList, Image, Dimensions, ImageBackground, AlertIOS } from 'react-native'
import Button from '../../lib/commons/Button'
import { H2, H3 } from '../../lib/commons/H'
import AsyncImage from '../../lib/commons/AsyncImage'
import { fetchAlbum, createAlbum } from '../../api/album'
import { connect } from 'react-redux'
import { getOwnerID } from '../../store/auth'
import { flexCenter } from '../../lib/commons/themes'
import Icon from 'react-native-vector-icons/Ionicons'
import LPModal from '../DetailModal'
import ImagePicker from 'react-native-image-picker'
import { uploadSingleImage } from '../../api/upload'
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
    uploading: false
  }

  async componentDidMount() {
    this.pickerAvatar = this.pickerAvatar.bind(this)
    let albumData = await fetchAlbum(this.props.uid, -100, '')
    this.setState({
      data: albumData.albums
    })
  }
  async uploadImageToAlbum(media) {
    let mediasUploaded = await uploadSingleImage(media)
    let res = await createAlbum(this.albumName, this.props.uid, [mediasUploaded])
    let albumData = await fetchAlbum(this.props.uid, -100, '')
    this.setState({
      data: albumData.albums,
      uploading: false
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
        await this.uploadImageToAlbum(imageData)
      }
    })
  }
  createAlbum() {
    AlertIOS.prompt('Album Name',
      text => this.albumName = text,
      [
        {
          text: 'Create Now',
          onPress: async () => await this.pickerAvatar()
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }
      ])
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
    let { data, selected, isVisible } = this.state
    return (
      <View style={{ flex: 1, paddingLeft: 1 }}>
        <LPModal isVisible={isVisible}
          selected={selected}>
        </LPModal>
        <Modal isVisible={this.state.uploading}>
          <Loading type='ThreeBounce' style={{ backgroundColor: 'transparent' }} />
        </Modal>
        <FlatList
          ListHeaderComponent={() =>
            <View style={{ height: width / 4 }}>
              <Button style={[flexCenter, {
                width: width / 4, height: width / 4,
                borderWidth: 1, borderColor: '#eee',
                backgroundColor: '#eee'
              }]} onPress={this.createAlbum.bind(this)}>
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
      </View>
    )
  }
}
let mapStateToProps = state => {
  return {
    // ownerId: getOwnerID(state)
  }
}

export default connect(mapStateToProps)(Album)