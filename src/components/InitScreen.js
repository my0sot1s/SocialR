import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { GetBlob, PostForm } from '../services'
import ImageSlider from '../lib/ImageSlider'
import SlideHeader from '../lib/SlideHeader'
import TouchAction from '../lib/TouchAction'
// https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae
class InitScreen extends PureComponent {
  state = {
    text: '',
    ImageList:
      [
        [{ link: 'https://i.imgur.com/78EUq7H.jpg' },
        { link: 'https://i.imgur.com/YjpY8im.jpg' },
        { link: 'https://i.imgur.com/oO7ADDS.jpg' },
        { link: 'https://i.imgur.com/KGhLtYS.jpg' }
        ],
        [{ link: 'https://i.imgur.com/B3530Ov.jpg' },
        { link: 'https://i.imgur.com/Fm78yn7.jpg' },
        { link: 'https://i.imgur.com/Q1kqFA0.jpg' }],
        [{ link: 'https://i.imgur.com/oO7ADDS.jpg' },
        { link: 'https://i.imgur.com/KGhLtYS.jpg' }]
      ],
    postsList: null
  }
  async componentDidMount() {
    let postsList = await GetBlob('https://serene-headland-81432.herokuapp.com/feed/5a106166cb8eae85d819a78e/feedPost/5a106166cb8eae85d819a78e?limit=10&page=1')
    postsList = await postsList.json()
    this.setState({ postsList: postsList })
  }

  render() {
    if (!this.state.postsList) return <View></View>
    const ImageRender = (data) =>
      <View>
        <SlideHeader data={this.state.postsList.users[0]} />
        <ImageSlider
          images={data.media}
          style={{ width: 100 + '%', height: 300 }} />
        <TouchAction text={data.text} />
      </View>
    return (
      <FlatList
        data={this.state.postsList.posts}
        extraData={this.state}
        style={{ marginTop: 20 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => ImageRender(item)} />
    );
  }
}

export default InitScreen