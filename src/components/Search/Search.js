import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  Dimensions
} from 'react-native'
import { SearchInput } from 'react-native-search-input'
import { H1, H2 } from '../../lib/commons/H'
import MediaLoading from '../../lib/MediaLoading'
import Button from '../../lib/commons/Button'
import AsyncImage from '../../lib/commons/AsyncImage'
import { getAllExplores, fetchExploreAll, getCurrentExploresLock } from '../../store/explore'
import { getUsers } from '../../store/user'
import { getOwnerID } from '../../store/auth'
import { connect } from 'react-redux'
import BottomLoader from '../../lib/commons/BottomLoader'
import { getUsersEmotion } from '../../store/emotion'
import OtherEmotion from '../Feeds/Emotion'
import { resizeImageByWidth } from '../../utils/func'
const { width } = Dimensions.get('window')
const objectPath = require('object-path')

class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
    this.fetchMore = this.fetchMore.bind(this)
    this.HeaderComponents = this.HeaderComponents.bind(this)
  }
  static navigationOptions = {
    header: null
  }
  async componentDidMount() {
    await this.props.fetchExploreAll()
  }
  getFirstMedia(post) {
    return objectPath.get(post, 'media.0', {})
  }
  onClickToView(item) {
    let getPostId = item.id
    this.props.navigation.navigate('Explore', { post_id: getPostId })
  }
  renderImageButton(item) {
    let firstMedia = this.getFirstMedia(item)
    return <Button style={{
      width: width / 3,
      height: width / 3,
      marginRight: 2,
      marginBottom: 2
    }} onPress={this.onClickToView.bind(this, item)}>
      <AsyncImage
        source={{ uri: resizeImageByWidth(firstMedia.url, width / 3) }}
        style={{ width: width / 3, height: width / 3 }}
        resizeMode="cover"
        placeholderColor="#dcc"
      />
    </Button>
  }
  async fetchMore() {
    if (!this.props.locked)
      await this.props.fetchExploreAll()
  }
  onRefreshList() {
    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 4000)
  }
  RefreshControl = () => <RefreshControl
    refreshing={this.state.isRefreshing}
    onRefresh={this.onRefreshList.bind(this)}
    // title="Pull to refresh"
    tintColor="red"
  // titleColor="red"
  />
  RenderFooter() {
    if (!this.props.locked) {
      return (<BottomLoader />)
    }
    return <View />
  }
  HeaderComponents() {
    let { emotions } = this.props
    return (
      <View>
        <OtherEmotion emotions={emotions} />
        <AsyncImage
          placeholderColor="#dcc"
          source={{ uri: 'https://picsum.photos/300/150/?random' }}
          style={{ width: width, height: width / 2, marginRight: 1 }}
          resizeMode="cover" />
        <H2 text="Story" style={{ margin: 3, color: '#bbb' }} />
      </View>
    )
  }
  render() {
    let { explores } = this.props
    let RenderLoading = <View />
    let RenderView = <FlatList
      ListHeaderComponent={() => this.HeaderComponents()}
      showsHorizontalScrollIndicator={false}
      refreshControl={this.RefreshControl.bind(this)()}
      scrollEventThrottle={16}
      style={{ height: '100%' }}
      data={explores}
      automaticallyAdjustContentInsets={false}
      numColumns={3}
      extraData={this.state}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => this.renderImageButton(item)}
      onEndReached={() => this.fetchMore()}
      onEndReachedThreshold={.01}
      ListFooterComponent={this.RenderFooter.bind(this)}
    />
    return (
      <View style={{ marginTop: 20, flex: 1 }}>
        <SearchInput
          ref="search_box"
          backgroundColor="#fff"
        // cancelButtonStyle={{ color: '#bbb' }}
        /**
        * There many props that can customizable
        * Please scroll down to Props section
        */
        />
        {explores.length > 0 ? RenderView : RenderLoading}
      </View>
    )
  }
}
let mapStateToProps = state => {
  return {
    users: getUsers(state),
    locked: getCurrentExploresLock(state),
    uid: getOwnerID(state),
    explores: getAllExplores(state),
    emotions: getUsersEmotion(state),
  }
}
export default connect(mapStateToProps, {
  fetchExploreAll
})(SearchView)
