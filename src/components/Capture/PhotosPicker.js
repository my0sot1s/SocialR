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
import { flexCenter, relatived } from '../../lib/commons/themes'
import Icon from 'react-native-vector-icons/Ionicons';
import { LogoTitle } from '../Comments/Comment'
import Modal from 'react-native-modal'
import ScrollTabIcons from '../../lib/TabBar/ScrollTab'
import HeaderCustom from '../../lib/commons/Header'
import ImageSlider from '../../lib/commons/ImageSlider'
import Video from '../../lib/Video/Video'
import Upload from './UploadPost'
// import RenderCamera from './Camera'
const { height, width } = Dimensions.get('window')
const ImagePicker = require('react-native-image-picker')
// https://www.codementor.io/blessingoraz/access-camera-roll-with-react-native-9uwupuuy0
class PhotosPicker extends PureComponent {

  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
      images: [],
      videos: [],
      selected: [],
      captured: [],
      isVisible: false,
      selectedVideo: {},
      slider1ActiveSlide: 1,
      fetchParamsImage: { first: 111, assetType: CameraRoll.AssetTypeOptions.Photos },
      fetchParamsVideo: { first: 111, assetType: CameraRoll.AssetTypeOptions.Videos },
      showLoading: false,
      tabSelected: 1
    }
    this.slideImagesShow = this.slideImagesShow.bind(this)
    this.renderModal = this.renderModal.bind(this)
  }

  static navigationOptions() {
    return {
      header: null
    }
  }
  async componentDidMount() {
    // get photos from camera roll
    let media = await CameraRoll.getPhotos(this.state.fetchParamsImage)
    let assets = media.edges;
    let photosLoaded = assets.map(asset => asset.node.image)
    assets.length = 0
    media = await CameraRoll.getPhotos(this.state.fetchParamsVideo)
    assets = media.edges;
    let videoLoaded = assets.map(asset => asset.node.image)
    this.setState({
      images: photosLoaded,
      videos: videoLoaded,
      selected: [photosLoaded[0].uri],
      selectedVideo: videoLoaded[0].uri
    })
  }
  // callback which processes received images from camera roll and stores them in an array
  SelectImage(uri) {
    this.state.tabSelected === 1 ? this.setState(prevState => {
      let images = prevState.selected.filter(img => img !== uri)
      if (images.length === prevState.selected.length) {
        return { selected: [...images, uri] }
      }
      return { selected: [...images] }
    }) : this.state.tabSelected === 2 ? this.setState({ selectedVideo: uri }) : null
  }
  ImageRended(image) {
    return (
      <Button style={[
        { borderColor: `#3097D1` }]}
        onPress={this.SelectImage.bind(this, image.uri)}
        style={styles.buttonSize}
      >
        <Image style={styles.image}
          source={{ uri: image.uri }}
          resizeMode="cover" />
      </Button>
    )
  }
  GetListImagesSelected = (imgSelected) => {
    let images = this.state.images.filter(img => {
      if (imgSelected.indexOf(img.uri) !== -1) return img
    })
    return images
  }
  componentWillUnmount() {
    this.setState({
      images: [],
      selected: []
    })
    this.state = null
  }
  onChangeTab({ i }) {
    this.setState({
      tabSelected: i
    })
  }
  slideImagesShow(data) {
    return (
      <View style={[{ flex: 1, height: 0.4 }]}>
        <ImageSlider
          images={data}
          style={{ width: 100 + '%', height: 400, zIndex: 10 }}
          hardHeight={400} />
      </View>
    )
  }
  renderVideoPlayer(data) {
    return (<View style={[{ flex: 1, height: 0.4 * height }]}>
      <Video style={{ height: 300 }}
        source={{ uri: data }} />
    </View>)
  }
  renderModal() {
    let { tabSelected, selected, captured, selectedVideo } = this.state
    let render = {}
    switch (tabSelected) {
      case 0: render = {
        data: [{ uri: captured[0], filename: `capture.${new Date().getTime()}` }],
        type: 'photos'
      }
        console.log('111111', [{ uri: captured[0], filename: `capture.${new Date().getTime()}` }])
        break
      case 1: render = {
        data: this.GetListImagesSelected(selected),
        type: 'photos'
      }
        console.log(this.GetListImagesSelected(selected))
        break
      case 2: render = {
        data: { uri: selectedVideo }, type: 'video'
      }
        break
      default: break
    }
    return (
      <Modal isVisible={this.state.isVisible}>
        <Upload sender={render}
          closeUpload={() => this.setState({ isVisible: false })}
          navigation={this.props.navigation} />
      </Modal>
    )
  }
  captureDone(uri) {
    this.setState({
      captured: [uri]
    })
  }
  render() {
    let { tabSelected, captured, images, videos, selectedVideo, selected } = this.state
    let Picker = (props) => {
      // let { tabSelected, images, videos, selectedVideo, selected } = this.state
      return <View style={styles.container} >
        <FlatList
          data={tabSelected === 1 ? images : tabSelected === 2 ? videos : []}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => this.ImageRended(item)} />
      </View>
    }
    let imageRender = selected.map(v => {
      return { url: v }
    })
    let imageCapturedRender = captured.map(v => {
      return { url: v }
    })
    return (
      <View style={{ flex: 1 }}>
        <HeaderCustom style={{ height: 30 }}
          leftComponent={
            <Button onPress={() => this.props.navigation.navigate('Feeds')} >
              <H1 text="Back" style={{
                textDecorationLine: 'underline',
                fontWeight: 'normal'
              }} />
            </Button >}
          rightComponent={
            <Button onPress={() => this.setState({ isVisible: true })}>
              <Icon name={'ios-arrow-forward'} size={27} />
            </Button>
          } />
        < View style={[styles.bigImage]} >
          {tabSelected === 0 ? this.slideImagesShow(imageCapturedRender) : null}
          {tabSelected === 1 ? this.slideImagesShow(imageRender) : null}
          {tabSelected === 2 ? this.renderVideoPlayer(selectedVideo) : null}
        </View>
        {this.renderModal()}
        <ScrollTabIcons
          ref={(tabView) => { this.tabView = tabView }}
          tabBarPosition="bottom" initialPage={1}
          onChangeTab={this.onChangeTab.bind(this)}
          style={{ paddingTop: 3, height: 45 }}>
          <RenderCamera tabLabel="Camera"
            didCancel={() => { }}
            didCapture={this.captureDone.bind(this)} />
          <Picker tabLabel="Image" />
          <Picker tabLabel="Video" />
        </ScrollTabIcons>
      </View >
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 0.3 * height
  },
  bigImage: {
    height: 0.6 * height
  },
  buttonSize: {
    width: 0.32 * width,
    height: 0.32 * width,
    marginHorizontal: 2,
    marginVertical: 2
  },
  image: {
    width: 0.32 * width,
    height: 0.32 * width,
  },
  headerContainer: {
    height: 40,
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class RenderCamera extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      uri: ''
    }
    this.renderCamera = this.renderCamera.bind(this)
  }
  componentDidMount() {
    this.renderCamera()
  }

  async renderCamera() {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    await ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.warn('cancel')
        this.props.didCancel()
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      console.log('response1111', response)
      this.props.didCapture(response.uri)
    })
  }
  render() {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <Button onPress={this.renderCamera.bind(this)}
          style={{ bottom: 20, left: '32%', position: 'absolute' }}>

          <H2 text="Relaunch Camera" />

        </Button>
      </View>
    )
  }
}

export default PhotosPicker