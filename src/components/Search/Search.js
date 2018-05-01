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

export default class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
  }

  static navigationOptions = {
    header: null
  }

  onClickToView(item) {
    let getPostId = item.id
    this.props.navigation.navigate('Explore', { post_id: getPostId })
  }

  render() {
    let { emotions } = this.props
    return (
      <View style={{ marginTop: 10, flex: 1, backgroundColor: 'transparent' }}>
        <SearchInput
          ref="search_box"
          backgroundColor="transparent"
        // cancelButtonStyle={{ color: '#bbb' }}
        />
        <OtherEmotion emotions={emotions} style={{ backgroundColor: 'transparent' }} />
        {/* {explores.length > 0 ? RenderView : RenderLoading} */}
      </View>
    )
  }
}
