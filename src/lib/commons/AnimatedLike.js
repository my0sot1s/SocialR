import React, { Component } from 'react'
import { View, Animated, Text, Image } from 'react-native'

class AnimatedLike extends Component {
  constructor(props) {
    super(props)
    this.IconBounce = new Animated.Value(0.3)
    this.opacityValue = new Animated.Value(0)
  }
  spring() {
    Animated.parallel([Animated.spring(
      this.IconBounce,
      {
        toValue: 1,
        friction: 0.5
      }
    ), this.opacityValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1]
    })]).start()
  }
  render() {
    return (
      <View style={[{ flex: 1, height: 100, width: 100 }, this.props.style]}>
        <Text
          style={{ marginBottom: 100 }}
          onPress={this.spring.bind(this)}>Spring</Text>
        <Animated.Image
          style={{
            width: 227,
            height: 200,
            transform: [{ scale: this.IconBounce }],
            opacity: this.IconOpacity
          }}
          source={{ uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' }} />
      </View>
    )
  }
}

export default AnimatedLike