import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import ImageSlider from '../../lib/commons/ImageSlider'
import TouchAction from '../../lib/TouchAction'
import SlideHeader from '../../lib/SlideHeader'
import { H4 } from '../../lib/commons/H'
// import AnimatedLike from '../../lib/commons/AnimatedLike'
import { timeSince } from '../../utils/func'
import { connect } from 'react-redux'
import { isLikePost, countLike } from '../../store/like'
import Button from '../../lib/commons/Button'
import { hitLikeNow } from '../../store/like'
import { fetchCountComment } from '../../api/comment'
import { getOwnerID } from '../../store/auth';
const objectPath = require('object-path')

class CardView extends React.PureComponent {

  state = {
    commentCount: 0
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
      alert('liked')
    }
    this.lastPress = new Date().getTime()
  }
  render() {
    let { data, users, ownerLiked, countLiked } = this.props
    let timeAgo = `${timeSince(new Date(data.created))} AGO`.toUpperCase()
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <SlideHeader data={users.find(u => u.id === data.user_id)}
          isliked={objectPath.get(ownerLiked, 'status')} />
        {/* <Button
          activeOpacity={1}
          style={{ width: 100 + '%', height: 300, zIndex: 10 }}> */}
        <ImageSlider
          onDoubleClick={this.onDoubleClick.bind(this, data.id)}
          images={data.media}
          style={{ width: 100 + '%', height: 300, zIndex: 10 }} />
        {/* </Button> */}
        <TouchAction text={data.text}
          tags={data.tags}
          pid={data.id}
          countLiked={countLiked}
          commentCount={this.state.commentCount}
          isliked={objectPath.get(ownerLiked, 'status')}
          {...this.props} />
        <H4 text={timeAgo}
          style={{ color: '#545454', marginLeft: 15, marginVertical: 5 }} />
      </View>
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
