import React, { Component } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
var Spinner = require('react-native-spinkit')
let { height } = Dimensions.get('window')
export default class Loading extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal, { backgroundColor: '#efeff4' }]}>
        <Spinner
          type={this.props.type || 'Circle'}
          color={'#42c8f4'}
          size={80}
          style={{ marginTop: height / 2 - 40 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
