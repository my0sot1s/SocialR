import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Clipboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Share, { ShareSheet, Button } from 'react-native-share';
import { H3, H2, H4, H1 } from './commons/H'
import ShareSheetAction from './commons/ShareSheetAction'
import ZButton from './commons/Button';
import { fetch2Comments } from '../api/comment'
import { getOwner, getOwnerID } from '../store/auth'
import { fetchMultipleUsers, getUsers } from '../store/user'
import { connect } from 'react-redux'
const cloneDeep = require('lodash/cloneDeep')
const objectPath = require('object-path')

// https://github.com/EstebanFuentealba/react-native-share
const styles = StyleSheet.create({
  container: {
    height: 35,
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    // marginHorizontal: 12
  },
  common: {
    // flex: 1,
    flexBasis: '15%'
  },
  bigger: {
    // flex: 5,
    flexBasis: '50%',
    paddingRight: 35
  },
  bold: {
    fontWeight: 'bold'
  }
})
class TouchAction extends PureComponent {
  constructor(props) {
    super(props)
    this.isPressComment = false
    this.sendToComment = this.sendToComment.bind(this)
  }
  state = {
    visible: false,
    shareOptions: {},
    newerComments: [],
  }
  onCancel() {
    console.log("CANCEL")
    this.setState({ visible: false });
  }
  async viewMoreComments() {
    await this.extraComments()
  }
  onOpen() {
    console.log("OPEN")
    this.setState({ visible: true });
  }
  async extraComments() {
    const { ownerId, pid } = this.props
    let newerComments = await fetch2Comments(ownerId, pid)
    console.log({ newerComments })
    let comments = objectPath.get(newerComments, 'comment', [])
    let listIds = comments.map(v => {
      return v.id
    })
    this.setState({
      newerComments: comments
    })
    await fetchMultipleUsers(comments)
  }
  shareOptions = {
    title: "React Native",
    message: "Hola mundo",
    url: "http://facebook.github.io/react-native/",
    subject: "Share Link" //  for email
  };
  Shared() {
    Share.open(this.shareOptions);
  }
  sendToComment() {
    if (this.isPressComment) return
    this.isPressComment = true
    this.props.navigation.navigate('Comment', { pid: this.props.pid })
    this.isPressComment = false
  }

  render() {
    let commentBox
    let { newerComments } = this.state
    if (newerComments.length < 1) {
      commentBox = <View />
    } else {
      let cmtText = []
      newerComments.forEach((v, key) => {
        cmtText.push(<H4 text={v.text} key={key} />)
      })
      commentBox = <View>
        {cmtText}
      </View>
    }
    let renderNumberComment = (num) => {
      if (num == 0) return `Press to first like this post`
      return `Like by ${num} peoples`
    }
    let tag = ''
    objectPath.get(this.props, 'tags', []).forEach(v => {
      tag += ` #${v} `
    })
    let countComment = this.props.commentCount == 0 ? `Press to comment this post` :
      `View more ${this.props.commentCount} comments...`
    let iconDefined = ['ios-chatbubbles-outline', 'ios-paper-plane-outline', 'blank', 'ios-archive-outline']
    let eventDefined = [this.sendToComment, this.Shared.bind(this), this.Shared]
    return (
      <View style={[styles.container, { flexDirection: 'column', height: 100, marginTop: 3 }]}>

        <View style={styles.container}>
          <View style={[styles.common,
          styles.container, { flexBasis: 13 + '%' }]}>
            <ZButton onPress={() => { }} style={{ width: '100%' }}>
              <Icon
                name={this.props.isliked ? 'ios-heart' : 'ios-heart-outline'}
                size={30}
                color={this.props.isliked ? '#f44295' : '#444'}
                style={{ padding: 3 }} />
            </ZButton>
          </View>
          {iconDefined.map((icon, index) =>
            icon != 'blank' ? <View style={[styles.common,
            styles.container, { flexBasis: 13 + '%' }]} key={index}>
              <ZButton onPress={eventDefined[index]} style={{ width: '100%' }}>
                <Icon
                  name={icon}
                  color="#444"
                  style={{ padding: 3 }}
                  size={32} />
              </ZButton>
            </View> :
              <View style={[styles.common, styles.container, { flexBasis: '46%' }]} key={index}>
              </View>
          )}
        </View>

        <View style={[styles.container, {
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: 15,
          flex: 1
        }]}>
          <H3 text={renderNumberComment(this.props.countLiked)} style={{
            color: '#545454'
          }} />
          <H2 text={this.props.text} style={{ color: '#545454' }} numberOfLine={2} />
          {commentBox}
          <ZButton onPress={this.viewMoreComments.bind(this)}
            style={{ padding: 0, margin: 0 }}>
            <H4 text={countComment}
              style={{
                color: '#a3a3a3', padding: 0,
                textAlign: 'left', margin: 0
              }} />
          </ZButton>
        </View>
        <ShareSheetAction visible={this.state.visible} onCancel={this.onCancel.bind(this)} />
      </View>
    );
  }
}
let mapStateToProps = state => {
  return {
    ownerId: getOwnerID(state),
    users: getUsers(state)
  }
}
export default connect(
  mapStateToProps,
  { fetchMultipleUsers }
)(TouchAction)
