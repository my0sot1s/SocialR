import React, { Component } from 'react'
import { View, KeyboardAvoidingView, Dimensions, Keyboard } from 'react-native'
import { H2, H1 } from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import { SimpleTableView } from '../../lib/ListViewAvatar'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { fetchComments, postCommentPost } from '../../api/comment'
import { getOwnerID, getOwner } from '../../store/auth'
const objectPath = require('object-path')
import { fetchMultipleUsers, getUsers } from '../../store/user'
import NoData from '../../lib/commons/NoData'
import CommentBox from './CommentBox'
import HeaderCustom from '../../lib/commons/Header'

export const LogoTitle = (props) => <H2 text={props.text || ""}
  style={{ fontFamily: 'Kailasa', fontWeight: 'normal' }} />
const { height } = Dimensions.get('screen')
class Comment extends Component {
  state = {
    limit: -100,
    anchor: '',
    comments: [],
    fetching: true,
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
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
    await this.props.fetchMultipleUsers(listUIds)
    this.setState({ comments: listComments, fetching: false })
  }
  async handleSubmit(text) {
    if (!text) return
    let { pid } = this.props.navigation.state.params
    let comment = await postCommentPost(this.props.uid, pid, text)
    this.setState(prevState => {
      return {
        comments: [objectPath.get(comment, 'comment', {}), ...prevState.comments],
      }
    })
  }
  render() {
    let { userLists, navigation } = this.props
    let { fetching, comments } = this.state
    return (
      <KeyboardAvoidingView
        style={{ position: 'relative', height }}
        behavior="padding">

        <HeaderCustom centerComponent={<LogoTitle text={navigation.state.params.title || "Comments".toUpperCase()} />}
          leftComponent={<Button onPress={() => {
            this.props.navigation.goBack();
            Keyboard.dismiss
          }}>
            <Icon name="label" size={40} style={{ transform: [{ rotate: '180deg' }] }} color="#ddd" />
          </Button>} />

        <View style={{ flex: 1 }}>
          {!fetching && comments.length === 0 ?
            <NoData text="Opp! Không có comments " />
            : <SimpleTableView
              comments={comments}
              users={userLists}
              owner={this.props.owner} />}
          <CommentBox user={this.props.owner}
            handleSubmit={this.handleSubmit.bind(this)}
            style={{
              marginBottom: 5, borderTopWidth: 1, paddingTop: 3,
              borderColor: '#ccc'
            }} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    uid: getOwnerID(state),
    userLists: getUsers(state),
    owner: getOwner(state)
  }
}
export default connect(mapStateToProps, {
  fetchMultipleUsers
})(Comment)