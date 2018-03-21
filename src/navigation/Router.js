import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { TabNavigator } from 'react-navigation'
import Icon from "react-native-vector-icons/Ionicons"
import InitScreen from '../components/InitScreen'
import ActionLogs from '../components/ActionLog'
// import Search from './Search'
// import ActionLog from './__ActionLog'
// import BasicInfo from './BasicInfo'
// import TabBar from '../TabNavigate'
// import ActionLogs from './ActionLogs'

const Default = () => <View></View>
const MainTabNavigation = TabNavigator({
  Feeds: {
    screen: InitScreen,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== "#000"
          ? <Icon name="ios-home-outline" size={26} />
          : <Icon name="ios-home" size={26} />
      ),
    })
  },
  Search: {
    screen: Default,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== "#000"
          ? <Icon name="ios-search-outline" size={26} />
          : <Icon name="ios-search" size={26} />
      ),
      header: null
    })
  },
  Capure: {
    screen: () => null,
    navigationOptions: (props) => ({
      tabBarLabel: null,
      tabBarIcon: ({ tintColor }) => (
        tintColor !== "#000"
          ? <Icon name="ios-add-outline" size={20}
            style={{
              borderWidth: 1,
              paddingHorizontal: 6,
              borderRadius: 5
            }} />
          : <Icon name="ios-add-outline" size={22}
            style={{
              borderWidth: 2,
              paddingHorizontal: 6,
              borderRadius: 5
            }} />
      ),
    })
  },
  ActionLog: {
    screen: ActionLogs,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== "#000"
          ? <Icon name="ios-heart-outline" size={26} />
          : <Icon name="ios-heart" size={26} />
      ),
    })
  },
  BasicInfo: {
    screen: Default,
    navigationOptions: (props) => ({
      tabBarIcon: ({ tintColor }) => (
        tintColor !== "#000"
          ? <Icon name="ios-person-outline" size={26} />
          : <Icon name="ios-person" size={26} />
      ),
    })
  },
}, {
    tabBarPosition: 'bottom',
    // animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#000',
      showLabel: false,
      inactiveTintColor: "#e91e63",
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#fff',
      },
    },
  })

class Home extends PureComponent {
  render() {
    return (
      <MainTabNavigation />
    );
  }
}

export default Home
