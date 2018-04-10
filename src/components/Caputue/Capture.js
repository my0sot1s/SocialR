import React, { PureComponent } from 'react'
import {
  CameraRoll,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { H1, H2, H3, H4 } from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import { flexCenter } from '../../lib/commons/themes'
import Icon from 'react-native-vector-icons/Ionicons';
import uploadImageFiles from '../../api/upload'
import { postDemo, sendCreatePost } from '../../api/post'
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get('window')

const DoUpload = async (imgs) => {
  debugger
  let fileInfo = await uploadImageFiles(imgs)
  return fileInfo
}

// https://www.codementor.io/blessingoraz/access-camera-roll-with-react-native-9uwupuuy0
class CameraRollView extends PureComponent {

  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
      images: [],
      selected: [],
      fetchParams: { first: 111 },
      groupTypes: 'SavedPhotos',
      isVisible: false,
      showLoading: false
    }
    this.StoreImages = this.StoreImages.bind(this)
    // this.LogImageError = this.LogImageError.bind(this)
    // this.SelectImage = this.SelectImage.bind(this)
  }

  async componentDidMount() {
    // get photos from camera roll
    let data = await CameraRoll.getPhotos(this.state.fetchParams);
    this.StoreImages(data)
  }
  async CreatePost(text) {
    let imageList = this.GetListImagesSelected(this.state.selected)
    let imagesInfo = await DoUpload(imageList)
    let tagDefault = ['test', 'iphone5']
    let uid = '5a106166cb8eae85d819a78e'
    let formOk = await sendCreatePost({ tags: tagDefault, medias: imagesInfo, uid: uid, content: text })
    alert(JSON.stringify(formOk))
  }
  ChangeModalVisible() {
    // alert(this.state.isVisible)
    this.setState({ isVisible: !this.state.isVisible })
  }
  // callback which processes received images from camera roll and stores them in an array
  StoreImages(data) {
    const assets = data.edges;
    const images = assets.map(asset => asset.node.image);
    this.setState({
      images,
      numColumns: 4,
      selected: images.length > 0 ? [images[0].uri] : []
    });
  }

  SelectImage(uri) {
    this.setState(prevState => {
      let images = prevState.selected.filter(img => img !== uri)
      if (images.length === prevState.selected.length) {
        return { selected: [...images, uri] }
      }
      return { selected: [...images] }
    })
    // console.log(this.state.selected)
  }
  HightlightImageSelected = (image) => {
    return this.state.selected.some(img => img === image)
  }
  ImageRended = (image) =>
    <TouchableHighlight style={[
      { borderColor: `#3097D1`, borderWidth: this.HightlightImageSelected(image.uri) ? 2 : 0 }]}
      onPress={this.SelectImage.bind(this, image.uri)}
    >
      <Image style={styles.image}
        source={{ uri: image.uri }}
        resizeMode="cover" />
    </TouchableHighlight>

  RenderBigImages = (img) =>
    <Image style={[styles.bigImage, { width: 0.98 * width, marginHorizontal: 5 }]}
      source={{ uri: img }}
      resizeMode="cover" />

  RenderPreviewImage = () =>
    <FlatList
      data={this.state.selected}
      horizontal
      style={[styles.bigImage, { width }]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => this.RenderBigImages(item)} />

  RenderCameraRoll = () =>
    <FlatList
      data={this.state.images}
      keyExtractor={(item, index) => index.toString()}
      numColumns={4}
      renderItem={({ item }) => this.ImageRended(item)} />

  GetListImagesSelected = (imgSelected) => {
    let images = this.state.images.filter(img => {
      if (imgSelected.indexOf(img.uri) !== -1) return img
    })
    return images
  }
  render() {
    return (
      <View style={{ height, width, marginTop: 20 }}>
        <Header ChangeModalVisible={this.ChangeModalVisible.bind(this)} />
        <View style={[styles.bigImage, { marginVertical: 5 }]}>
          {this.RenderPreviewImage()}
        </View>
        <View style={styles.container}>
          {this.RenderCameraRoll()}
        </View>
        <Modal isVisible={this.state.isVisible}>
          <KeyboardAwareScrollView>
            <View style={{ height: 0.45 * height, backgroundColor: '#fff' }}>
              <ModalInside
                ChangeModalVisible={this.ChangeModalVisible.bind(this)}
                CreatePost={this.CreatePost.bind(this)} />
            </View>
            <View style={{ height: 60 }} />
          </KeyboardAwareScrollView>
        </Modal>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 0.4 * height
  },
  bigImage: {
    height: 0.55 * height
  },
  buttonSize: {
    width: 0.24 * width,
    height: 0.24 * width,
    marginHorizontal: 3,
    marginVertical: 3
  },
  image: {
    width: 0.24 * width,
    height: 0.24 * width,
  },
  headerContainer: {
    height: 40,
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


class Header extends PureComponent {
  constructor(props) {
    super(props)
  }
  PressUploadPost() {
    this.props.ChangeModalVisible()
  }
  CaptureRequest() {
    alert("Chua phat trien")
  }
  render() {
    return (
      <View style={[styles.headerContainer, { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ececec' }]}>
        <View style={[styles.headerContainer, { flexDirection: 'row', flexBasis: '15%' }]}>
          <Icon
            name="ios-camera"
            size={30}
            color={'#5b5b5b'}
            style={{ paddingHorizontal: 10 }}
            onPress={this.CaptureRequest}
          />
        </View>
        <View style={[styles.headerContainer, { flexDirection: 'row', flexBasis: '70%' }]}>
          <H3 text="Share Image" style={{ color: '#5b5b5b', fontFamily: 'Zapfino' }}></H3>
        </View>
        <View style={[styles.headerContainer, { flexDirection: 'row', flexBasis: '15%' }]}>
          <Button style={{ alignContent: 'flex-end' }}>
            <Icon
              name="ios-arrow-forward-outline"
              size={23}
              color={'#5b5b5b'}
              style={{ paddingHorizontal: 10 }}
              onPress={this.PressUploadPost.bind(this)}
            />
          </Button>
        </View>
      </View>
    );
  }
}


class ModalInside extends PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    text: ''
  }
  HideForm() {
    this.props.ChangeModalVisible()
  }
  CreatePost() {
    if (this.state.text)
      this.props.CreatePost(this.state.text)
  }
  render() {
    return (
      <View>
        <View style={[flexCenter, { height: 0.08 * height, borderBottomColor: '#eee', borderBottomWidth: 1 }]}>
          <View style={{ flexBasis: '15%' }}></View>
          <View style={{ flexBasis: '70%' }}>
            <H2 text="Share" style={{ textAlign: 'center', fontFamily: 'Zapfino' }} />
          </View>
          <View style={{ flexBasis: '15%' }}>
            <Icon name={"ios-close-outline"} size={42}
              style={{ textAlign: 'right', marginRight: 15 }}
              onPress={this.HideForm.bind(this)}></Icon>
          </View>
        </View>
        <View style={[{ height: 0.27 * height }]}>
          <TextInput
            style={{ height: 0.27 * height, width: '98%', marginHorizontal: 0.02 * width, fontSize: 14 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            multiline={true}
            returnKeyType={'done'}
            enablesReturnKeyAutomatically={true}
            placeholder={"Enter your caption"}>
          </TextInput>
        </View>
        <View style={[flexCenter, {
          height: 0.1 * height,
          borderTopColor: '#eee',
          borderTopWidth: 1,
          flexDirection: 'row'
        }]}>
          <Button style={[flexCenter, {
            flexBasis: '50%', height: 0.1 * height,
            borderRightWidth: 1,
            borderRightColor: '#eee'
          }]} onPress={this.HideForm.bind(this)} >
            <Text style={{ fontSize: 18, color: '#5b5b5b' }}>Cancel</Text>
          </Button>
          <Button style={[flexCenter, { flexBasis: '50%', height: 0.1 * height }]}
            onPress={this.CreatePost.bind(this)}>
            <Text style={{ fontSize: 18, color: '#5b5b5b' }} >Ok</Text>
          </Button>
        </View>
      </View >
    );
  }
}

export default CameraRollView