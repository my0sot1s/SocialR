import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { flexCenter } from './themes'

const { width } = Dimensions.get('screen')
let styles = StyleSheet.create({
  short: {
    height: 35, flexBasis: '27.5%'
  },
  large: {
    height: 35, flexBasis: '45%'
  },
  container: {
    height: 35,
    width,
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  }
})
class HeaderCustom extends React.PureComponent {
  render() {
    return (
      <View style={[flexCenter, styles.container]}>
        <View style={[flexCenter, styles.short]}>
          {this.props.leftComponent}
        </View>
        <View style={[flexCenter, styles.large]}>
          {this.props.centerComponent}
        </View>
        <View style={[flexCenter, styles.short]}>
          {this.props.rightComponent}
        </View>
      </View>
    )
  }
}

export default HeaderCustom