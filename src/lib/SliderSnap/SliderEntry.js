import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from './SliderEntry.style'

export default class SliderEntry extends Component {

  get image() {
    const { data: { url }, parallax, parallaxProps, even } = this.props

    return parallax ? (
      <ParallaxImage
        source={{ uri: url }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        resizeMode="cover"
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
        <Image
          source={{ uri: url }}
          style={styles.image}
          resizeMode="cover"
        />
      )
  }

  render() {
    const { even } = this.props

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.slideInnerContainer, { paddingBottom: 0, height: 320 }]}
      // onPress={() => { alert(`You've clicked '${title}'`) }}
      >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          {this.image}
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
      </TouchableOpacity >
    )
  }
}
