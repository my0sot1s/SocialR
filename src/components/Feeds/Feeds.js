import React, { PureComponent } from 'react'
import {
  View, Text, FlatList, Image, StyleSheet,
  Dimensions, RefreshControl
} from 'react-native'

import Loading from '../../lib/commons/Loading'
import CardView from './CardView'
import TouchAction from '../../lib/TouchAction'
import Emotions from './Emotion'
import { connect } from 'react-redux'
import BottomLoader from '../../lib/commons/BottomLoader'
import { H2 } from '../../lib/commons/H'
import {
  fetchFeedAll,
  fetchFeedRefreshAll,
  getAllPosts,
  getCurrentLock
} from '../../store/post'
import { getUsers } from '../../store/user'
import { getUsersEmotion, fetchUserEmotion } from '../../store/emotion'
import { getOwnerID } from '../../store/auth'
const { height, width } = Dimensions.get('screen')
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
    await this.props.fetchFeedAll()
    await this.props.fetchUserEmotion(this.props.uid)
  }
  async onRefreshList() {
    this.setState({ isRefreshing: true })
    let { fetchFeedRefreshAll } = this.props
    await fetchFeedRefreshAll()
    this.setState({ isRefreshing: false })
  }
  async fetchMore() {
    if (!this.props.locked)
      await this.props.fetchFeedAll()
  }
  render() {
    let { feeds, users, emotions, uid } = this.props
    if (feeds.length === 0 || users.length === 0) return <Loading />
    return (
      <View style={styles.mainContent}>
        <FlatList
          ListHeaderComponent={() =>
            <View style={{ flex: 1 }}>
              <H2 text="Stories" style={{ paddingLeft: 10 }} />
              <Emotions emotions={emotions} uid={uid} />
            </View>}
          data={feeds}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CardView data={item} users={users} {...this.props} />}
          refreshControl={<RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefreshList.bind(this)}
            tintColor="red"
          />}
          onEndReached={this.fetchMore.bind(this)}
          onEndReachedThreshold={0}
          ListFooterComponent={() => {
            if (!this.props.locked) {
              return (<BottomLoader />)
            }
            return <View />
          }}
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
  fetchUserEmotion,
  fetchFeedRefreshAll
})(InitScreen)

const styles = StyleSheet.create({
  mainContent: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    height: 40,
    width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
