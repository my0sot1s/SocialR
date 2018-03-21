import React, { Component } from 'react';
import { View } from 'react-native';
// import { persistor, store } from './config/configureStore'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import InitScreen from './components/InitScreen'
import SplashScreen from 'react-native-splash-screen'
import Home from './navigation/Router'
class AppRoot extends React.PureComponent {

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      // <Provider store={store}>
      //   <PersistGate
      //     persistor={persistor}
      //     loading={<View />}>
      // <InitScreen />
      <Home />
      // <Navigation />
      //   </PersistGate>
      // </Provider>
    );
  }
}

export default AppRoot