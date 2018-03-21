import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const styles = StyleSheet.create({
  container: {
    minHeight: 47,
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  common: {
    // flex: 1,
    paddingLeft: 10,
    flexBasis: '15%'
  },
  tiny: {
    // flex: 1,
    flexBasis: '7%'
  },
  bigger: {
    // flex: 5,
    flexBasis: '78%',
    paddingRight: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  roundMode: {
    height: 40,
    width: 40,
    borderRadius: 20,
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
    fontSize: 15
  },
  textTime: {
    fontSize: 12,
    color: '#a3a3a3',
  },
  lineheight: {
    marginVertical: 5
  },
  // borderSet: {
  //   borderWidth: 1,
  //   borderColor: '#dbdbdb',
  //   borderLeft: 0,
  //   borderRight: 0
  // }
})
class ListViewAvatar extends PureComponent {
  state = {
    items: [
      {
        link: 'https://i.imgur.com/78EUq7H.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      },
      {
        link: 'https://i.imgur.com/YjpY8im.jpg',
        time: '5h ago',
        notice: 'style of the default tab bars underline',
        galeries: [
          { link: 'https://i.imgur.com/78EUq7H.jpg' },
          { link: 'https://i.imgur.com/oO7ADDS.jpg' },
          { link: 'https://i.imgur.com/78EUq7H.jpg' },
          { link: 'https://i.imgur.com/oO7ADDS.jpg' },
          { link: 'https://i.imgur.com/oO7ADDS.jpg' },
          { link: 'https://i.imgur.com/oO7ADDS.jpg' },
          { link: 'https://i.imgur.com/78EUq7H.jpg' },
          { link: 'https://i.imgur.com/oO7ADDS.jpg' }
        ]
      },
      { link: 'https://i.imgur.com/oO7ADDS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/KGhLtYS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      {
        link: 'https://i.imgur.com/78EUq7H.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      },
      { link: 'https://i.imgur.com/YjpY8im.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/oO7ADDS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/KGhLtYS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      {
        link: 'https://i.imgur.com/78EUq7H.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      },
      { link: 'https://i.imgur.com/YjpY8im.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/oO7ADDS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/KGhLtYS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      {
        link: 'https://i.imgur.com/78EUq7H.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      },
      { link: 'https://i.imgur.com/YjpY8im.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/oO7ADDS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
      { link: 'https://i.imgur.com/KGhLtYS.jpg', time: '5h ago', notice: 'style of the default tab bars underline' },
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
            <Image source={{ uri: item.link }}
              style={styles.galeryMode}
              resizeMode='cover' />} />
      return <View />
    }
    let ListItem = (data) => {
      let renderAvatar
      switch (this.props.type) {
        case 'block':
          renderAvatar = <Image source={{ uri: data.link }}
            resizeMode='cover' style={styles.blockMode} />
          break
        case 'round':
        default:
          renderAvatar = <Image source={{ uri: data.link }}
            resizeMode='cover' style={styles.roundMode} />
          break;
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
          <Icon name={'ios-information-outline'} size={22} />
        </View>
      </View >
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

export default ListViewAvatar;