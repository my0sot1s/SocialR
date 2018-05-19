import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { store } from './config/configureStore'
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import Home from './navigation/Router'
import { GetBlob } from './api/common'
import Loader from 'react-native-mask-loader'

class AppRoot extends React.PureComponent {
  constructor(props) {
    super(props)
    this.image = require('./assets/book-box.png')
  }
  state = {
    appReady: false,
    rootKey: Math.random(),
  }

  async componentDidMount() {
    SplashScreen.hide()
    this.resetAnimation()
    await GetBlob('')
  }
  resetAnimation() {
    this.setState({
      appReady: false,
      rootKey: Math.random()
    })

    setTimeout(() => {
      this.setState({
        appReady: true,
      })
    }, 1000)
  }

  render() {
    return (
      // <View key={this.state.rootKey} style={styles.root}>
      //   <Loader
      //     isLoaded={this.state.appReady}
      //     imageSource={this.image}
      //     backgroundStyle={styles.loadingBackgroundStyle}>
      <Provider store={store}>
        <Home />
      </Provider>
      //   </Loader>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingBackgroundStyle: {
    backgroundColor: 'rgba(125, 125, 255, 1)',
  },
});
export default AppRoot