import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { SearchList as FlatSearch } from '../../lib/ListViewAvatar'
import Modal from 'react-native-modal'
class SearchList extends Component {
  render() {
    return (
      this.props.isVisible ? <View style={{
        backgroundColor: '#fff',
        position: 'absolute',
        marginTop: 40,
        zIndex: 1000000
      }}>
        <FlatSearch navigation={this.props.navigation}
          userSearch={this.props.userSearch} />
      </View> : <View></View>
    )
  }
}

export default SearchList