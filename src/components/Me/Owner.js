import React from 'react'
import { View, Dimensions } from 'react-native'
import { flexCenter } from '../../lib/commons/themes'
import CircleImage from '../../lib/commons/CircleImage'
import { H1, H2, H4 } from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import { getOwner, logoutAccount } from '../../store/auth'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import ScrollableTabView from '../../lib/TabBar/ScrollTab'
import ListActivities from '../../lib/ListViewAvatar'
import ScrollTabIcon, { ScrollViewItem, styles } from '../../lib/TabBar/ScrollTabIcon'
const objectPath = require('object-path')
let { width, height } = Dimensions.get('screen')

class Owner extends React.PureComponent {
  logoutNow() {
    this.props.logoutAccount()
    this.props.navigation.navigate('Auth')
  }
  render() {
    let { owner } = this.props
    return (
      <View style={[flexCenter, {
        // flexDirection: 'column'
        // marginTop: 50
      }, this.props.style]}>

        <View style={[flexCenter, { width: 0.35 * width, height: 0.16 * height }]}>
          <CircleImage
            source={{ uri: objectPath.get(owner, 'avatar') }}
            resizeMode="cover"
            size={77} />
        </View>
        <View style={[flexCenter, { width: 0.65 * width, flexDirection: 'column', height: 0.16 * height }]}>
          <View style={[flexCenter]}>
            <H1 text={objectPath.get(owner, 'username')} />
          </View>
          <View style={{ alignSelf: 'flex-start', alignItems: 'flex-end', marginTop: 10 }}>
            <View style={[flexCenter]}>
              <Button style={[flexCenter, {
                height: 30,
                width: 70,
                borderRadius: 20,
                backgroundColor: '#ccc',
                marginRight: 5
              }]}>
                <H4 text={'follow'.toUpperCase()} style={{ color: '#fff' }} />
              </Button>
              <Button style={[flexCenter, {
                height: 30,
                width: 50,
                borderRadius: 20,
                backgroundColor: '#ccc',
                marginRight: 5
              }]} onPress={this.logoutNow.bind(this)}>
                <Icon name="ios-exit-outline" size={25} color='#fff' />
              </Button>
              <View style={[flexCenter, {
                height: 30,
                width: 55,
                borderRadius: 20,
                backgroundColor: '#ccc'
              }]}>
                <H4 text={this.props.count} style={{ color: '#fff' }} />
                <Icon name="ios-eye-outline" size={25} color='#fff' />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
let mapStateToProps = state => {
  return {
    owner: getOwner(state)
  }
}
export default connect(mapStateToProps, {
  logoutAccount
})(Owner)
