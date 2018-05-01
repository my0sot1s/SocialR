import React from 'react'
import { View, FlatList, Image, Dimensions, ImageBackground } from 'react-native'
import Button from '../../lib/commons/Button'
import { H2, H3 } from '../../lib/commons/H'
import AsyncImage from '../../lib/commons/AsyncImage'
import { fetchAlbum } from '../../api/album'
import { connect } from 'react-redux'
import { getOwnerID } from '../../store/auth'
import { flexCenter } from '../../lib/commons/themes'
import Icon from 'react-native-vector-icons/Ionicons'
import LPModal from '../DetailModal'
let { width, height } = Dimensions.get('screen')

class ChildAlbum extends React.PureComponent {
  render() {
    let { data } = this.props

    return (
      <FlatList
        ListHeaderComponent={() =>
          <View style={{ flex: 1 }}>
            <H3 text={data.album_name} style={{ paddingLeft: 5 }} />
          </View>}
        data={data.album_media}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        renderItem={({ item }) =>
          <Button style={{ padding: 0, margin: 0 }}
            activiOpacity={1}
            onLongPress={this.props.longPress.bind(this, item)}
          >
            <AsyncImage
              source={{ uri: item.url }}
              style={{
                width: width / 4 - 2,
                height: width / 4,
                padding: 2,
                borderColor: '#fff',
                borderRightWidth: 2
              }}
              resizeMode='cover' />
          </Button>
        }
      />)
  }
}

class Album extends React.PureComponent {
  state = {
    data: [],
    isVisible: false,
    selected: {}
  }
  async componentDidMount() {
    let albumData = await fetchAlbum(this.props.ownerId, -100, '')
    this.setState({
      data: albumData.albums
    })
  }
  longPress(item) {
    this.setState({
      isVisible: true,
      selected: item
    })
    setTimeout(() => {
      this.setState({
        isVisible: false,
        selected: {}
      })
    }, 2500)
  }
  render() {
    // array of array
    let { data, selected, isVisible } = this.state
    return (
      <View style={{ flex: 1, paddingLeft: 1 }}>
        <LPModal isVisible={isVisible}
          selected={selected}>
        </LPModal>
        <FlatList
          ListHeaderComponent={() =>
            <View style={{ height: width / 4 }}>
              <Button style={[flexCenter, {
                width: width / 4, height: width / 4,
                borderWidth: 1, borderColor: '#eee',
                backgroundColor: '#eee'
              }]}>
                <Icon name="ios-add" size={30} />
              </Button>
            </View>}
          data={data}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ChildAlbum
            data={item}
            longPress={this.longPress.bind(this)}
            {...this.props} />}
        />
      </View>
    )
  }
}
let mapStateToProps = state => {
  return { ownerId: getOwnerID(state) }
}

export default connect(mapStateToProps)(Album)