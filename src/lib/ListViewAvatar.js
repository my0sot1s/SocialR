import React, { PureComponent } from 'react';
import {
  View, Text, FlatList,
  StyleSheet, Image, Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { H2, H3, H4 } from '../lib/commons/H'
import { timeSince, resizeImageByWidth } from '../utils/func'
import AsyncImage from './commons/AsyncImage'
import CircleImage from './commons/CircleImage'
import Button from './commons/Button'
const objectPath = require('object-path')
const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    minHeight: 47,
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  common: {
    // flex: 1,
    paddingLeft: 5,
    flexBasis: '17%'
  },
  tiny: {
    // flex: 1,
    flexBasis: '8%'
  },
  bigger: {
    // flex: 5,
    flexBasis: '75%',
    paddingRight: 10,
    marginRight: 5
  },
  bold: {
    fontWeight: 'bold'
  },
  roundMode: {
    height: 35,
    width: 35,
    borderRadius: 17,
  },
  blockMode: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: '#afafaf'
    // borderRadius: 20
  },
  galeryMode: {
    height: 45,
    width: 45,
    flexBasis: '31%',
    margin: 2
    // borderRadius: 20
  },
  textStyle: {
    fontSize: 14
  },
  textTime: {
    fontSize: 12.5,
    color: '#a3a3a3',
  },
  lineheight: {
    marginVertical: 5
  },
})

class ListViewAvatar extends PureComponent {
  state = {
    items: [
      {
        link: 'https://i.imgur.com/UFUGlGnt.jpg', time: '5h ago', notice: 'style of the default tab bars underline',
        galeries: [{
          link: 'https://i.imgur.com/PBCuYl6t.jpg',
        }, {
          link: 'https://i.imgur.com/PBCuYl6t.jpg',
        }, {
          link: 'https://i.imgur.com/PBCuYl6t.jpg',
        }, {
          link: 'https://i.imgur.com/PBCuYl6t.jpg',
        }, {
          link: 'https://i.imgur.com/PBCuYl6t.jpg',
        }, {
          link: 'https://i.imgur.com/PBCuYl6t.jpg',
        }]
      },
      { link: 'https://i.imgur.com/PBCuYl6t.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/Qsv8Hjft.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      {
        link: 'https://i.imgur.com/DCbYbzJt.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      },
      { link: 'https://i.imgur.com/sX8txA1t.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/cUWRPkct.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/fdkkip8t.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      {
        link: 'https://i.imgur.com/H2j7aTkt.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      },
      { link: 'https://i.imgur.com/jj3Y7FEt.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/6yMZLA0t.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/7TTqKsxt.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      {
        link: 'https://i.imgur.com/s8ZMf7Ot.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      }
    ],
  }
  render() {
    let GaleryRender = (galeries = []) => {
      if (galeries.length > 0)
        return <FlatList
          data={galeries}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          style={[styles.container, { flexWrap: 'wrap' }]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <AsyncImage
              source={{ uri: item.link }}
              style={styles.galeryMode}
              resizeMode='cover' />} />
      return <View />
    }
    let ListItem = (data) => {
      let renderAvatar
      switch (this.props.type) {
        case 'block':
          renderAvatar = <AsyncImage
            source={{ uri: data.link }}
            resizeMode='cover' style={styles.blockMode} />
          break
        case 'round':
          renderAvatar = <AsyncImage
            source={{ uri: data.link }}
            resizeMode='cover' style={styles.roundMode} />
          break;
        default:
          renderAvatar = <View style={styles.roundMode} ><H2 text="#" /></View>
      }
      return <View style={[styles.container, styles.lineheight]}>
        <View style={[styles.container, styles.common]}>
          {renderAvatar}
        </View>
        <View style={[styles.container, styles.bigger, { flexDirection: 'column' }]}>
          <Text style={styles.textStyle}>{data.notice}<Text style={styles.textTime}> {data.time}</Text></Text>
          {GaleryRender(data.galeries)}
        </View>
        <View style={[styles.container, styles.tiny]}>
          <Icon name={'ios-reorder-outline'} size={22} />
        </View>
      </View>
    }
    return (
      <View>
        <FlatList
          data={this.state.items}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          // style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => ListItem(item)} />
      </View>
    );
  }
}

// TimeAgo.locale(en)
// const timeAgo = new TimeAgo('en-US')
export class SimpleTableView extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    usersComments: []
  }
  renderUsers(uid) {
    let { usersComments } = this.state
    let u = usersComments.find(u => u.id === uid)
    if (!u && this.props.owner.id === uid) return this.props.owner
    return u
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ usersComments: nextProps.users })
  }
  renderListItem(data) {
    let selected = this.renderUsers(data.user_id)
    let avatar = objectPath.get(selected, 'avatar')
    let name = objectPath.get(selected, 'fullname', '...')
    return (
      <View style={[styles.container, styles.lineheight]}>
        <View style={[styles.container, styles.common, { alignItems: 'flex-start' }]}>
          {!avatar ? <View></View> :
            <AsyncImage
              source={{ uri: resizeImageByWidth(avatar, width / 5) }}
              resizeMode='cover'
              style={{ height: 34, width: 34, borderRadius: 17 }} />
          }
        </View>
        <View style={[styles.container, styles.bigger, { flexDirection: 'column', alignItems: 'flex-start' }]}>
          <Text style={styles.textStyle} ><Text
            style={[styles.textStyle, { fontWeight: 'bold' }]}>{name + ':'}</Text>{data.text}</Text>
          <Text style={styles.textTime}>{timeSince(new Date(data.created))}</Text>
        </View>
        <View style={[styles.container, styles.tiny]}>
          <Icon name="ios-information-outline" size={22} />
        </View>
      </View >
    )
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.comments}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderListItem(item)} />
      </View>
    );
  }
}

export class SearchList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.changeToProfile = this.changeToProfile.bind(this)
    debugger
  }
  changeToProfile(data) {
    this.props.navigation.navigate('Profile', { uid: data.id })
  }
  renderListItem(data) {
    return (
      <Button style={[styles.container, styles.lineheight]}
        onPress={() => this.changeToProfile(data)}>
        <View style={[styles.container, styles.common, { alignItems: 'flex-start' }]}>
          <AsyncImage
            source={{ uri: data.avatar }}
            resizeMode='contain'
            style={{ height: 34, width: 34, borderRadius: 17 }} />
        </View>
        <View style={[styles.container, styles.bigger, { flexDirection: 'column', alignItems: 'flex-start' }]}>
          <Text style={styles.textStyle} >{data.fullname}</Text>
          <Text style={styles.textTime}>{data.username}</Text>
        </View>
      </Button>
    )
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.userSearch}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderListItem(item)} />
      </View>
    );
  }
}
export default ListViewAvatar;