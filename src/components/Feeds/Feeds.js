import React, { PureComponent } from 'react'
import {
  View, Text, FlatList, Image, StyleSheet,
  Dimensions, RefreshControl
} from 'react-native'

import Loading from '../../lib/commons/Loading'
import SlideHeader from '../../lib/SlideHeader'
import ImageSlider from '../../lib/commons/ImageSlider'
import BottomLoader from '../../lib/commons/BottomLoader'
import TouchAction from '../../lib/TouchAction'
import Emotions from './Emotion'
import { connect } from 'react-redux'
const { height, width } = Dimensions.get('screen')
import {
  fetchFeedAll, clearAllOldFeedFromStore,
  getAllPosts,
  getCurrentLock
} from '../../store/post'
import { getUsers } from '../../store/user'
import { getUsersEmotion, fetchUserEmotion } from '../../store/emotion'
import { getOwnerID } from '../../store/auth'

const objectPath = require('object-path')

const sleep = async (ms) => {
  await setTimeout(() => { }, ms)
}

class InitScreen extends PureComponent {

  state = {
    isRefreshing: false,
    isFetching: false
  }
  static navigationOptions = {
    header: null
  }

  async componentDidMount() {
    this.setState({ isFetching: true })
    // await Promise.all([
    await this.props.fetchFeedAll()
    // await sleep(300)
    await this.props.fetchUserEmotion(this.props.uid)
  }
  // componentWillReceiveProps(nextProps) {
  //   let feedPost = objectPath.get(this.state, 'postsList.posts', [])
  //   debugger
  //   if (nextProps.feeds.posts.length !== feedPost.length) {
  //     this.setState({
  //       postsList: nextProps.feeds,
  //       isLocked: nextProps.feeds.locked
  //     })
  //   }
  // }
  async onRefreshList() {
    let { clearAllOldFeedFromStore, fetchFeedAll } = this.props
    await this.clearAllOldFeedFromStore()
    await this.fetchFeedAll()
  }
  async fetchMore() {
    if (!this.props.locked)
      await this.props.fetchFeedAll()
  }
  ImageRender = (data, users) => <View>
    <SlideHeader data={users.find(u => u.id === data.user_id)} />
    <ImageSlider
      images={data.media}
      style={{ width: 100 + '%', height: 300 }} />
    <TouchAction text={data.text} tags={data.tags} {...this.props} pid={data.id} />
  </View>

  RefreshControl = () => <RefreshControl
    refreshing={this.state.isRefreshing}
    onRefresh={this.onRefreshList.bind(this)}
    title="Pull to refresh"
    tintColor="red"
    titleColor="red"
  />
  RenderFooter() {
    if (!this.props.locked) {
      return (<BottomLoader />)
    }
    return <View />
  }
  render() {
    let { feeds, users, emotions } = this.props
    if (feeds.length === 0 || users.length === 0) return <Loading />
    return (
      <View style={styles.mainContent}>

        <FlatList
          ListHeaderComponent={() => <Emotions emotions={emotions} />}
          data={feeds}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.ImageRender(item, users)}
          refreshControl={this.RefreshControl.bind(this)()}
          onEndReached={this.fetchMore.bind(this)}
          onEndReachedThreshold={0}
          ListFooterComponent={this.RenderFooter.bind(this)}
        />
      </View>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    feeds: getAllPosts(state),
    users: getUsers(state),
    locked: getCurrentLock(state),
    emotions: getUsersEmotion(state),
    uid: getOwnerID(state)
  }
}

export default connect(mapStateToProps, {
  fetchFeedAll,
  clearAllOldFeedFromStore,
  fetchUserEmotion
})(InitScreen)

const styles = StyleSheet.create({
  mainContent: {
    marginTop: 20,
    flex: 1
  },
  headerContainer: {
    height: 40,
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mock = [
  { "link": "http://i.imgur.com/Fm78yn7.jpg", "tag": "hats", "title": "Hats" },
  { "link": "http://i.imgur.com/7TTqKsx.jpg", "tag": "pies", "title": "Pies" },
  { "link": "http://i.imgur.com/6yMZLA0.jpg", "tag": "coffee", "title": "Coffee" },
  { "link": "http://i.imgur.com/jj3Y7FE.jpg", "tag": "honey", "title": "Honey" },
  { "link": "http://i.imgur.com/Q1kqFA0.jpg", "tag": "camera", "title": "Camera" },
  { "link": "http://i.imgur.com/UFUGlGn.jpg", "tag": "tree", "title": "Tree" },
  { "link": "http://i.imgur.com/PBCuYl6.jpg", "tag": "vegetabe", "title": "Vegetable" }]