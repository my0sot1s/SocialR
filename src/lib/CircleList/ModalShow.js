import React, { Component } from 'react'
import Modal from 'react-native-modal'
import { View, Image, Dimensions } from 'react-native'
import { flexCenter } from '../commons/themes'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import styles, { colors } from '../SliderSnap/index.style'
import { sliderWidth, itemWidth } from '../SliderSnap/SliderEntry.style'
import SliderEntry from '../SliderSnap/SliderEntry'
import Icon from 'react-native-vector-icons/Ionicons'
const { width } = Dimensions.get('screen')
const SLIDER_1_FIRST_ITEM = 1

class ModalShow extends Component {
  constructor(props) {
    super(props)
    this.mainExample = this.mainExample.bind(this)
    this.state = {
      slider1ActiveSlide: 1
    }
  }
  renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    )
  }
  getMedia(mediaShow) {
    return mediaShow.map(m => {
      return m.media[0]
    })
  }
  mainExample(mediaShow) {
    let listMedias = this.getMedia(mediaShow)
    return (
      <View style={styles.exampleContainer}>
        <View style={[flexCenter, {
          width: '100%',
          height: 30, justifyContent: 'flex-end'
        }]}>
          <Icon name='ios-close' size={45} color='#eee'
            style={{ paddingRight: 10 }}
            onPress={this.changeModalState.bind(this)} />
        </View>
        <Carousel
          ref={c => this._slider1Ref = c}
          data={listMedias}
          renderItem={this.renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={mediaShow.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    )
  }
  changeModalState() {
    this.props.emitHandlerClose()
  }
  render() {
    let { isVisible, mediaShow } = this.props
    return (
      <Modal isVisible={isVisible}
        onBackdropPress={this.changeModalState.bind(this)}>
        <View style={[flexCenter, { width: '100%', height: '100%' }]}>
          {this.mainExample(mediaShow)}
          {/* <Image source={{ uri: mediaShow.url }} resizeMode="center"
            style={[{ width, height: '100%' }]} /> */}
        </View>
      </Modal>
    )
  }
}

export default ModalShow