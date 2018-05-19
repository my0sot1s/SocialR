import React, { PureComponent } from 'react'
import { View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator, SwitchNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Feeds from '../components/Feeds/Feeds'
import Comment from '../components/Comments/Comment'
import Me from '../components/Me/me'
import PhotosPicker from '../components/Capture/PhotosPicker'
import Profile from '../components/ProfileInfo'
import Search from '../components/Search/Search'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Explore from '../components/Search/ExploresView'
import UploadPost from '../components/Capture/UploadPost'
import Ex from '../components/Explorer/Ex'
import Notifications from '../components/Notifications'

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
      },
      Profile: {
        screen: Me
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
        screen: Ex
      },
      Explore: {
        screen: Explore
      },
      Profile: {
        screen: Me
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
          ? <Icon name='ios-search-outline' size={28} />
          : <Icon name='ios-search' size={30} />
      ),
      header: null
    })
  },
  Capure: {
    screen: StackNavigator({
      MainCameraRollView: {
        screen: PhotosPicker,
        navigationOptions: {
          header: null,
          tabBarVisible: false
        }
      },
      Upload: {
        screen: UploadPost,
        navigationOptions: {
          header: null
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
  Me: {
    screen: StackNavigator({
      UserInfo: {
        screen: Me
      },
      Notifications: {
        screen: Notifications
      }
    }),
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== '#000'
          ? <Icon name='ios-person-outline' size={32} />
          : <Icon name='ios-person' size={30} />
        // ? <Icon name='ios-notifications-outline' size={28} />
        // : <Icon name='ios-notifications' size={28} />
      )
    })
  }
  // BasicInfo: {
  //   screen: Profile,
  //   // screen: Ex,
  //   navigationOptions: (props) => ({
  //     tabBarIcon: ({ tintColor }) => (
  //       tintColor !== '#000'
  //         ? <Icon name='ios-person-outline' size={26} />
  //         : <Icon name='ios-person' size={26} />
  //     )
  //   })
  // }
}, tabSettings)

let AuthStack = StackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
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
