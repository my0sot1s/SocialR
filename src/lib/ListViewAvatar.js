import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { H2 } from '../lib/commons/H' 
import AsyncImage from './commons/AsyncImage'
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
    paddingLeft: 5,
    flexBasis: '15%'
  },
  tiny: {
    // flex: 1,
    flexBasis: '7%'
  },
  bigger: {
    // flex: 5,
    flexBasis: '78%',
    paddingRight: 5
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
    fontSize: 12.5,
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
/*

https://i.imgur.com/UFUGlGnt.jpg
https://i.imgur.com/PBCuYl6t.jpg
https://i.imgur.com/Qsv8Hjft.jpg
https://i.imgur.com/DCbYbzJt.jpg

https://i.imgur.com/sX8txA1t.jpg
https://i.imgur.com/bIx25r5t.jpg
https://i.imgur.com/cUWRPkct.jpg
https://i.imgur.com/fdkkip8t.jpg

https://i.imgur.com/H2j7aTkt.jpg
https://i.imgur.com/jj3Y7FEt.jpg
https://i.imgur.com/6yMZLA0t.jpg
https://i.imgur.com/7TTqKsxt.jpg
https://i.imgur.com/s8ZMf7Ot.jpg
*/

class ListViewAvatar extends PureComponent {
  state = {
    items: [
      {
        link: 'https://i.imgur.com/UFUGlGnt.jpg', time: '5h ago', notice: 'style of the default tab bars underline'
      },
      // {
      //   link: 'https://picsum.photos/50/50/?random',
      //   time: '5h ago',
      //   notice: 'style of the default tab bars underline',
      //   galeries: [
      //     { link: 'https://picsum.photos/50/50/?random' },
      //     { link: 'https://picsum.photos/50/50/?random' },
      //     { link: 'https://picsum.photos/50/50/?random' },
      //     { link: 'https://picsum.photos/50/50/?random' },
      //     { link: 'https://picsum.photos/50/50/?random' },
      //     { link: 'https://picsum.photos/50/50/?random' },
      //     { link: 'https://picsum.photos/50/50/?random' },
      //     { link: 'https://picsum.photos/50/50/?random' }
      //   ]
      // },
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
      // { link: 'https://picsum.photos/50/50/?random', time: '5h ago', notice: 'style of the default tab bars underline' },
      // { link: 'https://picsum.photos/50/50/?random', time: '5h ago', notice: 'style of the default tab bars underline' },
      // { link: 'https://picsum.photos/50/50/?random', time: '5h ago', notice: 'style of the default tab bars underline' },
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