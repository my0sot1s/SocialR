import React from 'react'
import { View, Dimensions, Image, ImageBackground, StatusBar } from 'react-native'
import Modal from 'react-native-modal'
import AsyncImage from '../../lib/commons/AsyncImage'
let { width, height } = Dimensions.get('window')

class DetailModal extends React.PureComponent {
  render() {
    let { selected, isVisible } = this.props
    return (
      <Modal isVisible={isVisible} style={{
        width: width,
        height: height
      }}>
        <StatusBar hidden />
        <ImageBackground source={{ uri: selected.url }}
          style={{
            flex: 1,
            position: 'absolute',
            top: -20,
            left: -15,
            width,
            height
          }}
          resizeMode='cover'
          blurRadius={5}
        >
          <View style={{
            position: 'absolute',
            top: 0.2 * height
          }}>
            {/* {children} */}
            <AsyncImage
              source={{ uri: selected.url }}
              style={{
                flex: 1,
                width,
                height: 0.6 * height
              }}
              resizeMode='cover'
            />
          </View>
        </ImageBackground>
      </Modal >
    )
  }
}

export default DetailModal
