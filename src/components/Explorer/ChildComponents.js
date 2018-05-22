import React, { Component } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { sliderWidth, itemWidth, styles, slideHeight } from './calculate'
import { scrollInterpolators, animatedStyles } from '../../lib/SliderSnap/animations'
import {
  Platform, View, ScrollView, SafeAreaView,
  StatusBar, TouchableOpacity, Image,
  Dimensions,
  ImageBackground
} from 'react-native'
import Button from '../../lib/commons/Button'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { randomColor } from '../../utils/func'
import CircleImage from '../../lib/commons/CircleImage'
import { flexCenter } from '../../lib/commons/themes'
import { H3, H4 } from '../../lib/commons/H'
import DModal from '../DetailModal'
import { getOwnerID } from '../../store/auth'
import { connect } from 'react-redux'
import Video from '../../lib/Video/Video'
const objectPath = require('object-path')

export class Ex extends React.PureComponent {
  render() {
    let { refNumber } = this.props
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        // loop={true}
        // containerCustomStyle={styles.slider}
        // contentContainerCustomStyle={styles.sliderContentContainer}
        // scrollInterpolator={scrollInterpolators[`scrollInterpolator${refNumber}`]}
        // slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
        // useScrollView={true}
        {...this.props}
      />

    )
  }
}

export class Ex2ExComponent extends React.PureComponent {
  state = {
    isVisible: false,
    selected: {}
  }
  onPressed(data) {
    this.setState({
      isVisible: true,
      selected: data
    })
    setTimeout(() => {
      this.setState({
        isVisible: false,
        selected: {}
      })
    }, 2500)
  }
  checkProfile(user) {
    if (user.id !== this.props.ownerId) {
      this.props.navigation.navigate('Profile', { uid: user.id })
    } else {
      this.props.navigation.navigate('Me')
    }

  }
  render() {
    let { data, users } = this.props
    let user = users.find(u => u.id === data.user_id)
    let { selected, isVisible } = this.state

    return (
      <View style={{ flex: 1 }}>
        <DModal isVisible={isVisible}
          selected={selected}>
        </DModal>
        <Ex data={data.media}
          renderItem={({ item }) => <ChildSlider
            data={item}
            even={false}
            onPressed={this.onPressed.bind(this)}
          />}
          refNumber={4}
          hasParallaxImages={true}
        />
        <View style={[flexCenter, {
          height: 30,
          borderColor: randomColor(),
          borderLeftWidth: 3,
          // backgroundColor: 'rgba(255, 255, 255,0.4)',
          backgroundColor: 'rgba(0, 0, 0,0.4)',
          marginHorizontal: 8
        }]}>
          <Button style={{ flexBasis: '30%', alignContent: 'flex-start' }}
            onPress={this.checkProfile.bind(this, user)}>
            {user && user.avatar ? <CircleImage
              source={{ uri: objectPath.get(user, 'avatar', '') }}
              resizeMode="center"
              size={20} /> :
              <CircleImage
                source={require('../../assets/default-avatar.png')}
                resizeMode="center"
                size={20} />}
            <View style={{ marginLeft: 5 }}>
              <H3 text={objectPath.get(user, 'fullname', '')} />
            </View>
          </Button>
          <View style={{ flex: 5 }}>
          </View>
          <View style={{ flexBasis: '12%', alignContent: 'flex-end' }}>
            {objectPath.get(data, 'media', []).length > 1 ?
              <View style={[flexCenter]}>
                <H4 text={data.media.length} style={{ color: '#fff' }} />
                <Ionicons name='md-albums' size={24} color="#fff" />
              </View> :
              <Ionicons name='md-square' size={24} color="#fff" />}
          </View>
        </View>
      </View>
    )
  }
}
let mapStateToProps = state => {
  return {
    ownerId: getOwnerID(state)
  }
}
export const Ex2Ex = connect(mapStateToProps)(Ex2ExComponent)

export class ChildSlider extends React.PureComponent {

  get image() {
    const { data: { url }, parallax, parallaxProps, even } = this.props

    // return parallax === 'parallax' ? (
    return parallax ? (
      <ParallaxImage
        resizeMode="contain"
        source={{ uri: url }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />) :
      <Image
        source={{ uri: url }}
        style={styles.image}
        resizeMode="contain"
      />
  }
  checkRenderVideo(data) {
    return objectPath.get(data, 'format') === 'mp4'
  }
  render() {
    const { even, style, data, data: { url } } = this.props
    return (
      !this.checkRenderVideo(data) ? <TouchableOpacity
        activeOpacity={1}
        style={[styles.slideInnerContainer, style]}
        onPress={this.props.onPressed.bind(this, this.props.data)}
      >
        <View style={styles.shadow} />
        <ImageBackground
          style={[styles.imageContainer, even ? styles.imageContainerEven : {},
          { backgroundColor: '#bcbcbc' }]}
          source={{ uri: url }}
          blurRadius={7}>
          {this.image}
        </ImageBackground>
      </TouchableOpacity> :
        <Video style={styles.slideInnerContainer}
          source={{ uri: data.url }} />
    )
  }
}
