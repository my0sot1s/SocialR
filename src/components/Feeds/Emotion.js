import React from 'react'
import { View, Image } from 'react-native'

import ListCircleAction from '../../lib/CircleList'

class Emotions extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListCircleAction data={this.props.emotions} />
      </View>
    )
  }
}

export default Emotions
