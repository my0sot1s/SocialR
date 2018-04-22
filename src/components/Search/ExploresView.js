import React, { PureComponent } from 'react'
import { View } from 'react-native'
import CardView from '../Feeds/CardView'
import { connect } from 'react-redux'
import { findPost } from '../../store/explore'
import { getUsers } from '../../store/user'
import Button from '../../lib/commons/Button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LogoTitle } from '../Comments/Comment'

class ExploreView extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle text={"Explore".toUpperCase()} />,
      headerLeft: (
        <Button onPress={() => navigation.goBack()}>
          {/* <Icon name="label" size={50} style={{ transform: [{ rotate: '180deg' }] }} color="#ddd" /> */}
          <Ionicons name="ios-arrow-dropleft-outline" size={35}
            style={{}} color="#ddd" />
        </Button>
      )
    }
  }
  render() {
    let { post, users } = this.props
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <CardView data={post} users={users} />
      </View>
    )
  }
}
let mapStateToProps = (state, ownProps) => {
  let { post_id } = ownProps.navigation.state.params
  let post = findPost(state, post_id)
  return {
    post,
    users: getUsers(state)
  }
}
export default connect(mapStateToProps)(ExploreView)
