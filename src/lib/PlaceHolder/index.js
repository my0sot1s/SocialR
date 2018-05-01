import React, { Component } from 'react'
import { View } from 'react-native'
import Placeholder from 'rn-placeholder'

class PlaceHolderFeed extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Placeholder.ImageContent
          onReady={this.props.isReady}
          lineNumber={2}
          animate="shine"
          lastLineWidth="40%"
        >
          {this.props.children}
        </Placeholder.ImageContent>
      </View >
    )
  }
}

export default PlaceHolderFeed
