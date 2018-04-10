import React, { Component } from 'react'
import {
  View
} from 'react-native'
import { flexCenter } from './themes'
var Spinner = require('react-native-spinkit')

class BottomLoader extends React.PureComponent {
  render() {
    return (
      <View style={[flexCenter, { height: 40, backgroundColor: '#fff' }]}>
        <Spinner type="FadingCircle"
          color='#42c8f4'
          size={20}
          style={{ marginTop: 5 }} />
      </View>
    )
  }
}

export default BottomLoader