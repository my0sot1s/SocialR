import React, { PureComponent } from 'react'
import { View, Dimensions, Text, FlatList, RefreshControl } from 'react-native'
import ScrollTabIcon, { ScrollViewItem, styles } from '../../lib/TabBar/ScrollTabIcon'
import ScrollableTabView from '../../lib/TabBar/ScrollTab'
import ListActivities from '../../lib/ListViewAvatar'
import CardView from '../Feeds/CardView'
import Owner from './Owner'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  fetchMePostsAll,
  fetchRefreshMePostsAll,
  getMeAllPosts,
  getMeCurrentLock,
  removeAll
} from '../../store/me'
import Loading from '../../lib/commons/Loading'
import { fetchCountFollow, isFollow, followPeople, unfollowFriend } from '../../api/follow'
import { getUsers } from '../../store/user'
import { getOwnerID, getOwner } from '../../store/auth'
import { connect } from 'react-redux'
import BottomLoader from '../../lib/commons/BottomLoader'
import HeaderCustom from '../../lib/commons/Header'
import Button from '../../lib/commons/Button'
import Album from '../Album'
import Player from '../../lib/Video/Player'
import Video from '../../lib/Video/Video'
const { height } = Dimensions.get('screen')
const objectPath = require('object-path')

class Me extends PureComponent {
  constructor(props) {
    super(props)
    this.followAction = this.followAction.bind(this)
  }
  state = {
    isRefreshing: false,
    isFetching: false,
    count: 0,
    user: {},
    isFollow: {}
    // uid: ''
  }
  static navigationOptions = {
    header: null
  }
  async componentDidMount() {
    let { removeAll, uid, fetchMePostsAll, navigation, owner, users } = this.props
    await removeAll()
    let Uuid = objectPath.get(navigation, 'state.params.uid')
    let listReq = []
    if (Uuid) {
      this.setState({ uid: Uuid, user: users.find(u => u.id === Uuid) })
      listReq.push(isFollow(uid, Uuid))
    } else {
      this.setState({ uid, user: owner })

    }
    let resp = await Promise.all([
      fetchMePostsAll(this.state.uid),
      fetchCountFollow(this.state.uid, this.state.uid),
      ...listReq
    ])
    let stateSet = resp.length === 2 ? { count: resp[1] } : { count: resp[1], isFollow: resp[2] }
    this.setState(stateSet)
  }

  async onRefreshList() {
    this.setState({ isRefreshing: true })
    let { fetchRefreshMePostsAll } = this.props
    await fetchRefreshMePostsAll()
    this.setState({ isRefreshing: false })
  }
  async fetchMore() {
    let { locked, fetchMePostsAll, uid } = this.props
    if (!locked)
      await fetchMePostsAll(uid)
  }
  componentWillUnmount() {
    this.props.removeAll()
  }
  async followAction(actions, userTarget) {
    let { uid } = this.props
    // alert(`${userTarget},${uid}`)
    if (actions === 'follow') {
      let resuit = await followPeople(uid, userTarget)
      // increate follow count
      // change relation to unfollow
      if (resuit.ok)
        this.setState({
          count: Number(this.state.count) + 1,
          isFollow: !this.state.isFollow
        })
      else alert(`Can not ${actions} now`)
    }
    else if (actions === 'unfollow') {
      let resuit = await unfollowFriend(uid, userTarget)
      // reduce follow count
      // change relation to unfollow
      if (resuit.ok)
        this.setState({
          count: this.state.count - 1,
          isFollow: !this.state.isFollow
        })
      else alert(`Can not ${actions} now`)
    }
  }
  render() {
    let { mePosts, users, uid, locked } = this.props
    return (
      <View style={{ height, backgroundColor: '#fff', flex: 1 }}>
        {uid === this.state.uid ? < HeaderCustom style={{ height: 25, borderColor: "#fff", marginTop: 15 }}
          leftComponent={
            <Button onPress={() => { this.props.navigation.navigate('Notifications') }}>
              <Icon name={'ios-notifications-outline'} size={27} />
            </Button>
          }
          rightComponent={
            <Button onPress={() => { this.props.navigation.navigate('Notifications') }}>
              <Icon name={'ios-settings-outline'} size={27} />
            </Button>
          } /> : <View></View>}
        <Owner {...this.props}
          count={this.state.count}
          owner={this.state.user}
          isFollow={this.state.isFollow}
          doFollow={this.followAction} />
        <ScrollableTabView style={{ marginTop: 5, borderWidth: 1, borderColor: '#eee' }}>
          <View tabLabel='Timeline' style={[styles.tabView, { borderColor: '#eee', borderRightWidth: 1 }]}>
            <FlatList
              data={mePosts}
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
                if (!locked) {
                  return (<BottomLoader />)
                }
                return <View />
              }}
            />
          </View>
          <View tabLabel='Album' style={styles.tabView}>
            <Album {...this.props} uid={this.state.uid} />
          </View>
          {uid === this.state.uid ? <View tabLabel='Saved' style={styles.tabView}>
            {/* <Player /> */}
            <ListActivities type="round" />
            {/* <Video /> */}
          </View> : null}
        </ScrollableTabView >
      </View >
    )
  }
}
let mapStateToProps = (state) => {
  return {
    mePosts: getMeAllPosts(state),
    users: getUsers(state),
    locked: getMeCurrentLock(state),
    uid: getOwnerID(state),
    owner: getOwner(state)
  }
}
export default connect(mapStateToProps, {
  fetchMePostsAll,
  fetchRefreshMePostsAll,
  removeAll
})(Me)
