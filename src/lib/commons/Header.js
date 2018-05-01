import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { flexCenter } from './themes'

const { width } = Dimensions.get('screen')
let styles = StyleSheet.create({
  short: {
    height: 35, flexBasis: '25%'
  },
  large: {
    height: 35, flexBasis: '50%'
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
      <View style={[flexCenter, styles.container, { ...this.props.style }]}>
        <View style={[flexCenter, styles.short, { ...this.props.style }]}>
          {this.props.leftComponent}
        </View>
        <View style={[flexCenter, styles.large, { ...this.props.style }]}>
          {this.props.centerComponent}
        </View>
        <View style={[flexCenter, styles.short, { ...this.props.style }]}>
          {this.props.rightComponent}
        </View>
      </View>
    )
  }
}

export default HeaderCustom