import React, { PureComponent } from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Image, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import Button from '../commons/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import { flexCenter } from '../commons/themes'
import ModalShow from './ModalShow'
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
    height: 58,
    width: 58,
    borderRadius: 29
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
    let firstMedia = objectPath.get(props, '0', [])
    if (objectPath.get(firstMedia, 'public_id') !== 'add-button') {
      return (
        <Button onPress={() => this.props.onClick(firstMedia)} style={{ padding: 0, margin: 0 }}>
          <Image source={{ uri: firstMedia.url }} resizeMode='cover'
            style={styles.imageDim} />
        </Button>
      )
    }
    return <View style={[styles.imageDim, flexCenter, { borderColor: '#eee', borderWidth: 1 }]} >
      <Icon name='ios-add' size={60} color='#42c8f4' />
    </View>
  }
  render() {
    let { media, by } = this.props
    if (media) {
      return (
        <View>
          <Button style={styles.mainList}>
            {this.renderAddButton(media)}
            <View style={[styles.imgAva]}>
              <View style={[flexCenter, styles.imgWrapper]}>
                <View style={styles.round}></View>
              </View>
            </View>
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
    timeOut: 4000,
    isShowModal: false,
    mediaShow: {}
  }
  onPressEmotions(firstMedia) {
    this.setState({ isShowModal: true, mediaShow: firstMedia })

    setTimeout(() => {
      this.setState({ isShowModal: false, mediaShow: {} })
    }, this.state.timeOut)
  }
  renderRow(row) {
    let _row = objectPath.get(row, '0')
    return (
      <ListItem by={_row.by} media={_row.media} onClick={this.onPressEmotions} />
    )
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
      <View style={{ height: 70, backgroundColor: '#fff', borderColor: '#eee', borderBottomWidth: 1 }}>
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
          mediaShow={this.state.mediaShow} />
      </View>
    )
  }
}
export default ListCircle
