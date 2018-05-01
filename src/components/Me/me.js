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
} from '../../store/me'
import Loading from '../../lib/commons/Loading'
import { fetchCountFollow } from '../../api/follow'
import { getUsers } from '../../store/user'
import { getOwnerID } from '../../store/auth'
import { connect } from 'react-redux'
import BottomLoader from '../../lib/commons/BottomLoader'
import HeaderCustom from '../../lib/commons/Header'
import Button from '../../lib/commons/Button'
import Album from '../Album'
const { height } = Dimensions.get('screen')

class Me extends PureComponent {
  state = {
    isRefreshing: false,
    isFetching: false,
    count: 0
  }
  static navigationOptions = {
    header: null
  }
  async componentDidMount() {
    let { uid, fetchMePostsAll } = this.props
    let resp = await Promise.all([fetchMePostsAll(), fetchCountFollow(uid, uid)])
    this.setState({ count: resp[1] })
  }

  async onRefreshList() {
    this.setState({ isRefreshing: true })
    let { fetchRefreshMePostsAll } = this.props
    await fetchRefreshMePostsAll()
    this.setState({ isRefreshing: false })
  }
  async fetchMore() {
    if (!this.props.locked)
      await this.props.fetchMePostsAll()
  }
  render() {
    let { mePosts, users, uid, locked } = this.props
    return (
      <View style={{ height, backgroundColor: '#fff', flex: 1 }}>
        <HeaderCustom style={{ height: 25, borderColor: "#fff", marginTop: 15 }}
          rightComponent={
            <Button onPress={() => { this.props.navigation.navigate('Notifications') }}>
              <Icon name={'ios-notifications-outline'} size={27} />
            </Button>
          } />
        <Owner {...this.props} count={this.state.count} />
        <ScrollableTabView style={{ marginTop: 5, borderWidth: 1, borderColor: '#eee' }}>
          <View tabLabel='Timeline' style={[styles.tabView, { borderColor: '#eee', borderRightWidth: 1 }]}>
            {mePosts.length !== 0 ? <FlatList
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
            /> : <Loading />}
          </View>
          <View tabLabel='Album' style={styles.tabView}>
            <Album {...this.props} />
          </View>
          <View tabLabel='Saved' style={styles.tabView}>
            <ListActivities type={'block'} />
          </View>
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
    uid: getOwnerID(state)
  }
}
export default connect(mapStateToProps, {
  fetchMePostsAll,
  fetchRefreshMePostsAll
})(Me)
