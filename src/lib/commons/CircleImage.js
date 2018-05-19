import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'
import { flexCenter } from './themes'
class CircleImage extends PureComponent {
  render() {
    return (
      <View style={[flexCenter, {
        width: this.props.size + 4,
        height: this.props.size + 4,
        borderRadius: (this.props.size + 4) / 2,
        borderWidth: 2,
        borderColor: '#ed4956'
      }]} >
        <Image source={this.props.source}
          resizeMode={this.props.resizeMode}
          style={{
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.size / 2,
            borderWidth: 1,
            borderColor: '#ddd'
          }} />
      </View>
    )
  }
}

export default CircleImage
