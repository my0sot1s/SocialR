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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LogoTitle } from '../Comments/Comment'
import ScrollTabIcons from '../../lib/TabBar/ScrollTab'
import HeaderCustom from '../../lib/commons/Header'
import styles2, { colors } from '../../lib/SliderSnap/index.style'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { sliderWidth, itemWidth } from '../../lib/SliderSnap/SliderEntry.style'
import { scrollInterpolators, animatedStyles } from '../../lib/SliderSnap/animations'
import SliderEntry from '../../lib/SliderSnap/SliderEntry'
const { height, width } = Dimensions.get('window')

// https://www.codementor.io/blessingoraz/access-camera-roll-with-react-native-9uwupuuy0
class CameraRollView extends PureComponent {

  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
      images: [],
      videos: [],
      selected: [],
      fetchParamsImage: { first: 111, assetType: 'Photos' },
      fetchParamsVideo: { first: 111, assetType: 'Videos' },
      showLoading: false
    }
    this.customExample = this.customExample.bind(this)
  }

  static navigationOptions() {
    return {
      header: null
    }
  }
  async componentDidMount() {
    // get photos from camera roll
    let photos = await CameraRoll.getPhotos(this.state.fetchParamsImage)
    let videos = await CameraRoll.getPhotos(this.state.fetchParamsVideo)
    this.StoreMedias([photos, videos])
    // this.StoreMedias(data[1], 'videos')
  }
  // callback which processes received images from camera roll and stores them in an array
  StoreMedias(data = []) {
    let medias = []
    for (let media of data) {
      const assets = media.edges;
      medias.push(assets.map(asset => asset.node.image))
    }
    this.setState({
      images: medias[0],
      videos: medias[1],
      numColumns: 3,
      selected: medias[0].length > 0 ? [medias[0][0].uri] : []
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

  RenderBigImages = (img) =>
    <Image style={[styles.bigImage, {
      width: 0.98 * width,
      marginHorizontal: 5,
      marginVertical: 3
    }]}
      source={{ uri: img }}
      resizeMode="cover" />

  GetListImagesSelected = (imgSelected) => {
    let images = this.state.images.filter(img => {
      if (imgSelected.indexOf(img.uri) !== -1) return img
    })
    return images
  }
  componentWillUnmount() {
    this.setState({
      images: [],
      videos: [],
      selected: []
    })
    this.state = null
  }
  customExample(data, refNumber = 1) {
    const isEven = refNumber % 2 === 0

    // Do not render examples on Android because of the zIndex bug, they won't work as is
    return (
      <View style={[{ flex: 1 }, styles.bigImage]}>
        <Carousel
          data={data}
          renderItem={({ item, index }) => < SliderEntry
            data={item} even={(index + 1) % 2 === 0} />}
          sliderWidth={width}
          itemWidth={0.85 * width}
          loop={true}
          // containerCustomStyle={styles2.slider}
          // contentContainerCustomStyle={styles2.sliderContentContainer}
          scrollInterpolator={scrollInterpolators[`scrollInterpolator${refNumber}`]}
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView={true}
        />
        {/* {this.RenderBigImages(data.url)} */}
      </View>
    )
  }
  render() {

    let RenderPicker = (props) => {
      let { tabLabel } = props
      let renderType = tabLabel === 'Image' ? this.state.images
        : this.state.videos
      return <View style={styles.container} >
        <FlatList
          data={renderType}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => this.ImageRended(item)} />
      </View>
    }
    let imageRender = this.state.selected.map(v => {
      return { url: v }
    })
    return (
      <View style={{ flex: 1 }}>
        <HeaderCustom
          // centerComponent={
          //   <LogoTitle text={"Create Post".toUpperCase()}
          //     style={{ color: "#aaa" }} />
          // }
          leftComponent={
            <Button onPress={() => this.props.navigation.navigate('Feeds')} >
              <H2 text="Back" style={{
                textDecorationLine: 'underline',
                fontWeight: 'normal'
              }} />
            </Button >}
          rightComponent={
            <Button onPress={() => this.props.navigation.navigate('Upload',
              { sender: this.GetListImagesSelected(this.state.selected) })}>
              <H2 text="Publish" style={{
                textDecorationLine: 'underline',
                fontWeight: 'normal'
              }} />
            </Button>
          } />
        <View style={[styles.bigImage]}>
          {/* {this.customExample(imageRender)} */}
          <FlatList
            data={this.state.selected}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={styles.bigImage}
            // numColumns={3}
            renderItem={({ item }) => this.RenderBigImages(item)} />
        </View>
        <ScrollTabIcons tabBarPosition="bottom" style={{ paddingTop: 3, height: 45 }}>
          <RenderPicker tabLabel="Image" />
          <RenderPicker tabLabel="Video" />
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
});

export default CameraRollView