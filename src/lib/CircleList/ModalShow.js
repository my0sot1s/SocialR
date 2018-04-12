import React, { Component } from 'react'
import Modal from 'react-native-modal'
import { View, Image, Dimensions } from 'react-native'
import { flexCenter } from '../commons/themes'
const { width } = Dimensions.get('screen')
class ModalShow extends Component {
  render() {
    let { isVisible, mediaShow } = this.props
    return (
      <Modal isVisible={isVisible}>
        <View style={[flexCenter, { width: '100%', height: '100%' }]}>
          <Image source={{ uri: mediaShow.url }} resizeMode="center"
            style={[{ width, height: '100%' }]} />
        </View>
      </Modal>
    )
  }
}

export default ModalShow