import React, { PureComponent } from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Image, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import Button from '../commons/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { flexCenter } from '../commons/themes'
import ModalShow from './ModalShow'
import { resizeImageByWidth } from '../../utils/func'
import CircleImage from '../commons/CircleImage'
let { height, width } = Dimensions.get('window')
const objectPath = require('object-path')
const styles = StyleSheet.create({
  mainList: {
    display: 'flex',
    flexDirection: 'column',
    padding: 3,
    paddingRight: 6,
    position: 'relative'
  },
  imageDim: {
    height: 62,
    width: 62,
    borderRadius: 31
  },
  imgAva: {
    zIndex: 1001, position: 'absolute',
    top: 0, right: 0,
    margin: 2,
    // overflow: 'hidden'
  },
  imgWrapper: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#EEE'
  },
  round: {
    height: 8,
    width: 8,
    borderRadius: 1,
    backgroundColor: '#42b72a'
  },
  textLabel: {
    textAlign: 'center',
    fontSize: 12
  }
})

class ListItem extends PureComponent {
  renderAddButton(props) {
    // get first
    let firstMedia = objectPath.get(props, '0.media.0', [])
    if (objectPath.get(firstMedia, 'public_id') !== 'add-button') {
      let height = objectPath.get(this.props, 'height', 70)
      return (
        <Button onPress={() => this.props.onClick(props)}
          style={{ padding: 0, margin: 0 }}>
          <CircleImage source={{ uri: resizeImageByWidth(firstMedia.url, width / 2) }}
            resizeMode='cover'
            size={height - 10} />
        </Button>
      )
    }
    return (
      <Button onPress={() => this.props.onClick(props)}
        style={styles.imageDim}>
        <View style={[styles.imageDim, flexCenter, { borderColor: '#eee', borderWidth: 1 }]} >
          <Icon name='ios-add' size={30} color='#42c8f4' />
        </View>
      </Button>
    )
  }
  render() {
    let { media } = this.props
    if (media) {
      return (
        <View>
          <Button style={styles.mainList}>
            {this.renderAddButton(media)}
          </Button>
        </View>
      )
    }
    return (<View> {/* {this.renderAddButton({})} */} </View>)

  }
}

class ListCircle extends PureComponent {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.onPressEmotions = this.onPressEmotions.bind(this)
  }
  state = {
    timeOut: 50 * 1000,
    isShowModal: false,
    mediaShow: []
  }
  onPressEmotions(mediaShow) {
    let firstMedia = objectPath.get(mediaShow, '0.media.0', {})
    if (firstMedia.public_id === 'add-button' && firstMedia.url === 'ios-add-outline') {
      this.props.clickChooseImage()
      return
    }
    this.setState({ isShowModal: true, mediaShow: mediaShow })
    setTimeout(() => {
      this.setState({ isShowModal: false, mediaShow: [] })
    }, this.state.timeOut)
  }
  renderRow(row) {
    return (
      <ListItem media={row}
        {...this.props}
        onClick={this.onPressEmotions.bind(this)} />
    )
  }
  emitHanderClose() {
    this.setState({
      isShowModal: false
    })
  }
  render() {
    let addButton = [{
      by: 'system',
      media: [{ url: 'ios-add-outline', public_id: 'add-button' }]
    }]
    const { style, data } = this.props || {}
    let vals = Object.values(data || {}) || []
    let emotions = [addButton, ...vals]
    return (
      <View style={[{
        height: this.props.height || 70, backgroundColor: '#fff',
        borderColor: '#eee', borderBottomWidth: 1
      }, this.props.style]}>
        <FlatList
          data={emotions}
          extraData={this.state}
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderRow(item)} />
        <ModalShow
          isVisible={this.state.isShowModal}
          mediaShow={this.state.mediaShow}
          emitHandlerClose={this.emitHanderClose.bind(this)} />
      </View>
    )
  }
}
export default ListCircle
