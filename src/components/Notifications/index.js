import React from 'react'
import { View } from 'react-native'
import ListActivities from '../../lib/ListViewAvatar'
class Notifications extends React.PureComponent {
  static navigationOptions = {
    title: 'Notifications'
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListActivities type={'round'} />
      </View>
    )
  }
}

export default Notifications