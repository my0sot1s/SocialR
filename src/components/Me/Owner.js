import React from 'react'
import { View, Dimensions } from 'react-native'
import { flexCenter } from '../../lib/commons/themes'
import CircleImage from '../../lib/commons/CircleImage'
import { H1, H2, H4 } from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import { logoutAccount, getOwnerID } from '../../store/auth'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import ScrollableTabView from '../../lib/TabBar/ScrollTab'
import ScrollTabIcon, { ScrollViewItem, styles } from '../../lib/TabBar/ScrollTabIcon'
const objectPath = require('object-path')
let { width, height } = Dimensions.get('screen')

class Owner extends React.PureComponent {
  logoutNow() {
    this.props.logoutAccount()
    this.props.navigation.navigate('Auth')
  }
  async doFollowNow(action, user) {
    await this.props.doFollow(action, user)
  }
  render() {
    let { owner, isFollow, ownerId } = this.props
    let ifollow = objectPath.get(isFollow, 'isFollow', true)
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
            <H1 text={`${objectPath.get(owner, 'fullname', objectPath.get(owner, 'username', ''))}(${objectPath.get(owner, 'username', '')})`} />
          </View>
          <View style={{ alignSelf: 'flex-start', alignItems: 'flex-end', marginTop: 10 }}>
            <View style={[flexCenter]}>
              {!ifollow ? <Button style={[flexCenter, {
                height: 30,
                flex: 1,
                // width: 70,
                borderRadius: 20,
                backgroundColor: '#ccc',
                marginRight: 5
              }]} onPress={this.doFollowNow.bind(this, 'follow', objectPath.get(owner, 'id', ''))}>
                <H4 text={'follow'.toUpperCase()} style={{ color: '#fff' }} />
              </Button> : ownerId === objectPath.get(owner, 'id', '') ? <View></View> : <Button style={[flexCenter, {
                height: 30,
                flex: 1,
                // width: 70,
                borderRadius: 20,
                backgroundColor: '#ccc',
                marginRight: 5
              }]} onPress={this.doFollowNow.bind(this, 'unfollow', objectPath.get(owner, 'id', ''))}>
                <H4 text={'unfollow'.toUpperCase()} style={{ color: '#fff' }} /></Button>}
              {ownerId === objectPath.get(owner, 'id', '') ? <Button style={[flexCenter, {
                height: 30,
                // width: 50,
                flex: 1,
                borderRadius: 20,
                backgroundColor: '#ccc',
                marginRight: 5
              }]} onPress={this.logoutNow.bind(this)}>
                <Icon name="ios-exit-outline" size={25} color='#fff' />
              </Button> : <View></View>}
              <View style={[flexCenter, {
                height: 30,
                // width: 55,
                flex: 1,
                borderRadius: 20,
                backgroundColor: '#ccc'
              }]}>
                <H4 text={this.props.count} style={{ color: '#fff' }} />
                <Icon name="ios-eye-outline" size={25} color='#fff' />
              </View>
            </View>
          </View>
        </View>
      </View >
    )
  }
}

let mapStateToProps = (state) => {
  return {
    ownerId: getOwnerID(state)
  }
}
export default connect(mapStateToProps, {
  logoutAccount
})(Owner)
