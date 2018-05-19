import React, { Component } from 'react'
import { View } from 'react-native'
import Placeholder from 'rn-placeholder'

class PlaceHolderFeed extends Component {
  render() {
    return (
      <View style={[this.props.isReady ? { flex: 1 } : this.props.style]}>
        <Placeholder.ImageContent
          onReady={!!this.props.isReady}
          lineNumber={4}
          animate="shine"
          lastLineWidth="100%"
          firstLineWidth="20%"
        >
          {this.props.children}
        </Placeholder.ImageContent>
      </View>
    )
  }
}

export default PlaceHolderFeed
