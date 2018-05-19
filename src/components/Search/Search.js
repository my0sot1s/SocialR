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
import { getUsers, searchUserInfo, getUsersSearched } from '../../store/user'
import { connect } from 'react-redux'
import OtherEmotion from '../Feeds/Emotion'
import debounce from 'lodash/debounce'
import SearchList from './SearchList'
const { width } = Dimensions.get('window')
const objectPath = require('object-path')

class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      isVisible: false,
      text: ''
    }
    this.doSearching = debounce(this.doSearching.bind(this), 200)
  }

  static navigationOptions = {
    header: null
  }

  onClickToView(item) {
    let getPostId = item.id
    this.props.navigation.navigate('Explore', { post_id: getPostId })
  }
  doSearching(text) {
    this.props.searchUserInfo(text)
    // searchUserInfo(text).then(data => {
    //   let { users } = data

    // })
  }

  onFocus() {
    this.setState({
      isVisible: true
    }, () => {
      this.props.searchingData(true)
    })
  }
  async onChangeText(text = '') {
    if (text.trim() === '') return
    this.doSearching(text)
  }
  onCancel() {
    this.setState({
      isVisible: false,
    }, () => {
      this.props.searchingData(false)
    })
  }
  render() {
    let { emotions, userSearch } = this.props
    return (
      <View style={{ marginTop: 10, flex: 1, backgroundColor: 'transparent' }}>
        <SearchInput
          ref="search_box"
          backgroundColor="transparent"
          onFocus={this.onFocus.bind(this)}
          onChangeText={this.onChangeText.bind(this)}
          onCancel={this.onCancel.bind(this)}
          titleCancelColor="#bbb"
        // cancelButtonStyle={{ color: '#bbb' }}
        />
        <SearchList isVisible={this.state.isVisible} userSearch={userSearch}
          navigation={this.props.navigation} />
        <OtherEmotion emotions={emotions} style={{ backgroundColor: 'transparent' }} />
        {/* {explores.length > 0 ? RenderView : RenderLoading} */}
      </View>
    )
  }
}

let mapStateToProps = state => {
  return {
    userSearch: getUsersSearched(state)
  }
}

export default connect(mapStateToProps, {
  searchUserInfo
})(SearchView)