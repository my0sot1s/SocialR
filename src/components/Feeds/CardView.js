import React from 'react'
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native'
import ImageSlider from '../../lib/commons/ImageSlider'
import TouchAction from '../../lib/TouchAction'
import SlideHeader from '../../lib/SlideHeader'
import { H4 } from '../../lib/commons/H'
// import AnimatedLike from '../../lib/commons/AnimatedLike'
import { timeSince, resizeImageByWidth } from '../../utils/func'
import { connect } from 'react-redux'
import { isLikePost, countLike } from '../../store/like'
import Button from '../../lib/commons/Button'
import { hitLikeNow } from '../../store/like'
import { fetchCountComment } from '../../api/comment'
import { getOwnerID } from '../../store/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PlaceHolder from '../../lib/PlaceHolder'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import {
  styles, sliderWidth, itemWidth,
  colors, scrollInterpolators, animatedStyles
} from '../Explorer/calculate'
import Video from '../../lib/Video/Video'
import { ChildSlider } from '../Explorer/ChildComponents'

const objectPath = require('object-path')

class CardView extends React.PureComponent {

  state = {
    commentCount: 0,
    slider1ActiveSlide: 1,
    showHeart: false
  }
  async componentDidMount() {
    let { id, ownerId } = this.props.data
    let commentCount = await fetchCountComment(ownerId, id)
    this.setState({ commentCount })
  }

  lastPress = 0
  async onDoubleClick(pid) {
    let { ownerId, hitLikeNow } = this.props
    var delta = new Date().getTime() - this.lastPress
    if (delta < 250) {
      await hitLikeNow(ownerId, pid)
      this.setState({ showHeart: true })
      setTimeout(() => {
        this.setState({ showHeart: false })
      }, 220)
    }
    this.lastPress = new Date().getTime()
  }
  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <ChildSlider
        data={item}
        even={(index + 1) % 2 === 0}
      // parallax={true}
      // parallaxProps={parallaxProps}
      />
    )
  }
  mainExample(data) {
    const { slider1ActiveSlide } = this.state
    data = data.map(v => {
      v.url = resizeImageByWidth(v.url, sliderWidth * 3)
      return v
    })
    return (
      <Carousel
        ref={c => this._slider1Ref = c}
        data={data}
        renderItem={this._renderItemWithParallax}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        firstItem={1}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        horizontal={true}
        containerCustomStyle={styles.slider}
        // contentContainerCustomStyle={styles.sliderContentContainer}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
        onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
      />
    )
  }
  checkVideo(dataMedia) {
    return dataMedia.length === 1 && objectPath.get(dataMedia, '0.format') === 'mp4'
  }
  render() {
    let { data, users, ownerLiked, countLiked } = this.props
    let timeAgo = `${timeSince(new Date(data.created))} AGO`.toUpperCase()
    let usr = users.find(u => u.id === data.user_id)

    return (
      <PlaceHolder isReady={!!usr}
        style={{ height: 200, paddingTop: 20, paddingLeft: 10 }}>
        <View style={{ flex: 1, position: 'relative' }}>
          <SlideHeader data={usr} navigation={this.props.navigation} />
          {!this.checkVideo(data.media) ? <ImageSlider
            onDoubleClick={this.onDoubleClick.bind(this, data.id)}
            images={data.media}
            style={{ width: 100 + '%', height: 300, zIndex: 10 }} /> :
            <Video style={{ height: 300 }}
              source={{ uri: data.media[0].url }} />}
          {this.state.showHeart ? <LikeComponent /> : null}
          {/* {this.mainExample(data.media)} */}
          < TouchAction text={data.text}
            tags={data.tags}
            pid={data.id}
            countLiked={countLiked}
            commentCount={this.state.commentCount}
            isliked={objectPath.get(ownerLiked, 'status')}
            {...this.props} />
          <H4 text={timeAgo}
            style={{ color: '#545454', marginLeft: 15, marginVertical: 5 }} />
        </View>
      </PlaceHolder >
    )
  }
}
const mapStateToProps = (state, ownerProp) => {
  return {
    ownerLiked: isLikePost(state, ownerProp.data.id),
    countLiked: countLike(state, ownerProp.data.id),
    ownerId: getOwnerID(state)
  }
}
export default connect(mapStateToProps, {
  hitLikeNow
})(CardView)

const LikeComponent = props => <View style={{ position: 'absolute', top: '30%', left: '35%' }}>
  <Ionicons name='ios-heart' size={150} color='rgba(252, 252, 252,0.5)' />
</View>