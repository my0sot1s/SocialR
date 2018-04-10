import React, { Component } from 'react';
import { View } from 'react-native';
import { store } from './config/configureStore'
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import Home from './navigation/Router'
import { GetBlob } from './api/common'

class AppRoot extends React.PureComponent {

  async componentDidMount() {
    await GetBlob('')
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider >
    )
  }
}

export default AppRoot