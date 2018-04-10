import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions
} from 'react-native'
import { SearchInput } from 'react-native-search-input'
import { H2 } from '../../lib/commons/H'
import MediaLoading from '../../lib/MediaLoading'
import Button from '../../lib/commons/Button'
import AsyncImage from '../../lib/commons/AsyncImage'
const { width } = Dimensions.get('window')
class SearchView extends Component {
  constructor(props) {
    super(props)
    this.item = {
      link: 'https://picsum.photos/100/100/?random',
      time: '5h ago',
      notice: 'style of the default tab bars underline'
    }
    let tempList = []
    let items = ['https://i.imgur.com/UFUGlGnm.jpg',
    'https://i.imgur.com/PBCuYl6m.jpg',
    'https://i.imgur.com/Qsv8Hjfm.jpg',
    'https://i.imgur.com/DCbYbzJm.jpg',
    'https://i.imgur.com/sX8txA1m.jpg',
    'https://i.imgur.com/bIx25r5m.jpg',
    'https://i.imgur.com/cUWRPkcm.jpg',
    'https://i.imgur.com/fdkkip8m.jpg',
    'https://i.imgur.com/H2j7aTkm.jpg',
    'https://i.imgur.com/jj3Y7FEm.jpg',
    'https://i.imgur.com/6yMZLA0m.jpg',
    'https://i.imgur.com/7TTqKsxm.jpg',
    'https://i.imgur.com/s8ZMf7Om.jpg']
    for (let i = 0; i < 6; i++) {
      tempList.push({
        link: items[i],
        time: '5h ago',
        notice: 'style of the default tab bars underline'
      })
    }
    this.state = {
      list: tempList
    }
    this.fetchMore = this.fetchMore.bind(this)
  }
  renderImageButton (item) {
    return <Button style={{ width: width / 3, height: width / 3, marginRight: 2, marginBottom: 2 }}>
      <AsyncImage
        source={{ uri: item.link }}
        style={{ width: width / 3, height: width / 3 }}
        resizeMode="cover"
        placeholderColor="#dcc"
      />
    </Button>
  }
  fetchMore () {
    let items = ['https://i.imgur.com/UFUGlGnm.jpg',
    'https://i.imgur.com/PBCuYl6m.jpg',
    'https://i.imgur.com/Qsv8Hjfm.jpg',
    'https://i.imgur.com/DCbYbzJm.jpg',
    'https://i.imgur.com/sX8txA1m.jpg',
    'https://i.imgur.com/bIx25r5m.jpg',
    'https://i.imgur.com/cUWRPkcm.jpg',
    'https://i.imgur.com/fdkkip8m.jpg',
    'https://i.imgur.com/H2j7aTkm.jpg',
    'https://i.imgur.com/jj3Y7FEm.jpg',
    'https://i.imgur.com/6yMZLA0m.jpg',
    'https://i.imgur.com/7TTqKsxm.jpg',
    'https://i.imgur.com/s8ZMf7Om.jpg']
    let tempList = []
    for (let i = 0; i < 6; i++) {
      tempList.push({
        link: items[0],
        time: '5h ago',
        notice: 'style of the default tab bars underline'
      })
    }
    this.setState(prevState => {
      return {
        list: [...prevState.list, ...tempList]
      }
    })
  }
  render () {
    return (
      <View style={{ marginTop: 20, flex: 1 }}>
        <SearchInput
          ref="search_box"
          backgroundColor="#fff"
        // cancelButtonStyle={{ color: '#bbb' }}
        /**
        * There many props that can customizable
        * Please scroll down to Props section
        */
        />

        <FlatList
          ListHeaderComponent={() => <View>
            <AsyncImage
              placeholderColor="#dcc"
              source={{ uri: 'https://picsum.photos/300/150/?random' }}
              style={{ width: width, height: width / 2, marginRight: 1 }}
              resizeMode="cover" />
            <H2 text="Story" style={{ margin: 3, color: '#bbb' }} />
          </View>}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ height: '100%' }}
          data={this.state.list}
          automaticallyAdjustContentInsets={false}
          numColumns={3}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderImageButton(item)}
          onEndReached={() => this.fetchMore()}
          onEndReachedThreshold={0}
        />
      </View>
    )
  }
}

export default SearchView