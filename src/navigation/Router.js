import React, { PureComponent } from 'react'
// import { View, Text, TouchableOpacity } from 'react-native'
import { TabNavigator, StackNavigator, SwitchNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Feeds from '../components/Feeds/Feeds'
import Comment from '../components/Comments/Comment'
import ActionLogs from '../components/ActionLog/ActionLog'
import CameraRollView from '../components/Caputue/Capture'
import Profile from '../components/ProfileInfo'
import Search from '../components/Search/Search'
import Login from '../components/Login'

const tabSettings = {
  tabBarPosition: 'bottom',
  // animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#000',
    showLabel: false,
    inactiveTintColor: '#e91e63',
    labelStyle: {
      fontSize: 12
    },
    style: {
      backgroundColor: '#fff'
    }
  }
}
const MainTabNavigation = TabNavigator({
  Feeds: {
    screen: StackNavigator({
      Main: {
        screen: Feeds
      },
      Comment: {
        screen: Comment
      }
    }),
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
      tintColor !== '#000'
        ? <Icon name='ios-home-outline' size={26} />
        : <Icon name='ios-home' size={26} />
      )
    })
  },
  Search: {
    screen: Search,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
      tintColor !== '#000'
        ? <Icon name='ios-search-outline' size={26} />
        : <Icon name='ios-search' size={26} />
      ),
      header: null
    })
  },
  Capure: {
    screen: CameraRollView,
    navigationOptions: (props) => ({
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
      tintColor !== '#000'
        ? <Icon name='ios-add-outline' size={20} style={{ borderWidth: 1, paddingHorizontal: 6, borderRadius: 5 }} />
        : <Icon name='ios-add-outline' size={22} style={{ borderWidth: 2, paddingHorizontal: 6, borderRadius: 5 }} />
      )
    })
  },
  ActionLog: {
    screen: ActionLogs,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
      tintColor !== '#000'
        ? <Icon name='ios-notifications-outline' size={26} />
        : <Icon name='ios-notifications' size={26} />
      )
    })
  },
  BasicInfo: {
    screen: Profile,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
      tintColor !== '#000'
        ? <Icon name='ios-person-outline' size={26} />
        : <Icon name='ios-person' size={26} />
      )
    })
  }
}, tabSettings)

let AuthStack = StackNavigator({
  Login: {
    screen: Login
  }
})

let StackNavigate = StackNavigator({
  MainComponent: {
    screen: MainTabNavigation,
    navigationOptions: {
      header: null
    }
  }
})

let SwitchNavigate = SwitchNavigator(
  {
    App: StackNavigate,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth'
  }
)

class Home extends PureComponent {
  render () {
    return (
      <SwitchNavigate />
    )
  }
}

export default Home
