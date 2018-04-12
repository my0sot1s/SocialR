import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from './themes'
import Icon from 'react-native-vector-icons/Ionicons'

class NoData extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Icon
          name='ios-paw'
          color={theme.inactiveColor}
          size={48}
        />
        <View>
          <Text style={styles.text}>
            {this.props.text || 'Oops! Không có dữ liệu :)'}
          </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color: theme.inactiveColor
  }
})

export default NoData