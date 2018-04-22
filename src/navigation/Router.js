import React, { PureComponent } from 'react'
import { View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator, SwitchNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Feeds from '../components/Feeds/Feeds'
import Comment from '../components/Comments/Comment'
import ActionLogs from '../components/ActionLog/ActionLog'
import CameraRollView from '../components/Caputue/Capture'
import Profile from '../components/ProfileInfo'
import Search from '../components/Search/Search'
import Login from '../components/Login'
import Explore from '../components/Search/ExploresView'
import UploadPost from '../components/Caputue/UploadPost'

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
        screen: Comment,
        navigationOptions: {
          tabBarVisible: false
        }
      }
    }),
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== '#000'
          ? <Icon name='ios-home-outline' size={28} />
          : <Icon name='ios-home' size={30} />
      )
    })
  },
  Search: {
    screen: StackNavigator({
      MainSearch: {
        screen: Search
      },
      Explore: {
        screen: Explore
      }
    }),
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== '#000'
          ? <Icon name='ios-search-outline' size={28} />
          : <Icon name='ios-search' size={30} />
      ),
      header: null
    })
  },
  Capure: {
    screen: StackNavigator({
      MainCameraRollView: {
        screen: CameraRollView,
        navigationOptions: {
          tabBarVisible: false
        }
      },
      Upload: {
        screen: UploadPost,
        navigationOptions: {
          tabBarVisible: false
        }
      }
    }),
    navigationOptions: (props) => ({
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        tintColor !== '#000'
          ? <Icon name='ios-add-outline' size={25} style={{ borderWidth: 1, paddingHorizontal: 6, borderRadius: 5 }} />
          : <Icon name='ios-add-outline' size={27} style={{ borderWidth: 2, paddingHorizontal: 6, borderRadius: 5 }} />
      )
    })
  },
  ActionLog: {
    screen: ActionLogs,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== '#000'
          ? <Icon name='ios-notifications-outline' size={28} />
          : <Icon name='ios-notifications' size={28} />
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
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
          barStyle={'light-content'}
        />
        <SwitchNavigate />
      </View>
    )
  }
}

export default Home
