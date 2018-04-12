import React, { Component } from 'react'
import { View } from 'react-native'
import { H2, H1 } from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import ListActivities, { SimpleTableView } from '../../lib/ListViewAvatar'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { fetchComments } from '../../api/comment'
import { getOwnerID } from '../../store/auth'
const objectPath = require('object-path')
import { fetchMultipleUsers, getUsers } from '../../store/user'
import NoData from '../../lib/commons/NoData';
const LogoTitle = (props) => <H2 text={props.text || "Comments"}
  style={{ fontFamily: 'Kailasa', fontWeight: 'normal' }} />

class Comment extends Component {
  state = {
    limit: 100,
    anchor: '',
    comments: [],
    fetching: true
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle text={"Comments".toUpperCase()} />,
      headerLeft: (
        <Button onPress={() => navigation.goBack()}>
          {/* <Icon name="label" size={50} style={{ transform: [{ rotate: '180deg' }] }} color="#ddd" /> */}
          <Ionicons name="ios-arrow-dropleft-outline" size={35}
            style={{}} color="#ddd" />
        </Button>
      )
    }
  }
  async componentDidMount() {

    let { pid } = this.props.navigation.state.params
    // fetch Comment
    let { limit, anchor } = this.state
    let comments = await fetchComments(this.props.uid,
      pid, limit, anchor)
    let listComments = objectPath.get(comments, 'comment', [])
    let listUIds = []
    listComments.forEach(cmt => {
      listUIds.push(cmt.user_id)
    })
    this.setState({ comments: listComments, fetching: false }, () => {
      this.props.fetchMultipleUsers(listUIds)
    })
  }

  render() {
    // let { userLists } = this.props
    let { fetching, comments } = this.state
    if (!fetching && comments.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <NoData text="Opp! Không có comments " />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <SimpleTableView comments={this.state.comments}
          users={this.props.userLists} />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    uid: getOwnerID(state),
    userLists: getUsers(state)
  }
}
export default connect(mapStateToProps, {
  fetchMultipleUsers
})(Comment)