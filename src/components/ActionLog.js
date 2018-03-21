import React, { PureComponent } from 'react'
import { View, Dimensions, Text } from 'react-native'
import ScrollTabIcon, { ScrollViewItem, styles } from '../lib/TabBar/ScrollTabIcon'
import ScrollableTabView from '../lib/TabBar/ScrollTab'
import ListActivities from '../lib/ListViewAvatar'
const { height } = Dimensions.get('screen')

class ActionLogs extends PureComponent {
  render() {
    return (
      <View style={{ height, backgroundColor: '#fff' }}>
        <ScrollableTabView style={{ marginTop: 15 }}>
          <View tabLabel="You" style={styles.tabView}>
            <ListActivities type={'round'} />
          </View>
          {/* <View tabLabel="Following" style={styles.tabView}></View> */}
          <View tabLabel="Saved" style={styles.tabView} >
            <ListActivities type={'block'} />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

export default ActionLogs;
