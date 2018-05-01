import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Keyboard,
  Dimensions
} from 'react-native'
import { H1, H2, H3 } from '../../lib/commons/H'
import { flexCenter } from '../../lib/commons/themes'
import EditTextHighlight from '../../lib/commons/EditText'
import Button from '../../lib/commons/Button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { loginAccount } from '../../store/auth'
import { GetStorageByKey } from '../../config/configureStore'
const { width, height } = Dimensions.get('window')

class Login extends Component {
  constructor(props) {
    super(props)
    this.scroll = null
  }
  static navigationOptions = {
    // title: null,
    header: null
  }
  state = {
    login: null,
    username: 'haont',
    password: 'haont',
    isHandler: false
  }
  async componentDidMount() {
    let loginInfo = await GetStorageByKey('LOGIN')
    if (!loginInfo || !loginInfo.hasOwnProperty('username')
      || !loginInfo.hasOwnProperty('password')) {
      this.setState({ isHandler: true })
      return
    }
    await this.props.loginAccount(loginInfo.username, loginInfo.password)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) this.props.navigation.navigate('App')
  }

  loginToApp() {
    Keyboard.dismiss
    let { username, password } = this.state
    this.props.loginAccount(username, password)
  }
  changeUsername(user) {
    this.setState(prevState => ({ username: user }))
  }
  changePassword(pw) {
    this.setState(prevState => ({ password: pw }))
  }
  // renderTop () {
  //   return (

  //   )
  // }
  render() {
    let { isHandler } = this.state
    return (
      isHandler ?
        <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}
          scrollEnabled={false}>
          <ImageBackground blurRadius={1}
            source={require('../../assets/bg.jpg')}
            style={{ width, height }}>
            <View style={{
              flex: 1, marginTop: 0.35 * height, marginHorizontal: 20,
              backgroundColor: 'transparent'
            }}>
              <H3 text={"UserName:".toUpperCase()} style={{
                marginVertical: 10,
                color: '#ccc',
                fontFamily: 'Helvetica'
              }} />
              <EditTextHighlight
                onChangeText={this.changeUsername.bind(this)}
                autoCapitalize='none'
                addition={{ padding: 8, fontSize: 16 }}
                value={this.state.username}
              />
              <H3 text={"Password:".toUpperCase()} style={{
                marginVertical: 10,
                color: '#ccc',
                fontFamily: 'Helvetica'
              }} />
              <EditTextHighlight secureTextEntry onChangeText={this.changePassword.bind(this)}
                addition={{ padding: 8, fontSize: 16 }}
                value={this.state.password}
              />
              <Button onPress={this.loginToApp.bind(this)}
                style={{ backgroundColor: '#3097d2', marginTop: 30 }}>
                <H3 text={"Login".toUpperCase()} style={{
                  color: '#fff', paddingVertical: 15,
                  fontFamily: 'Helvetica'
                }} />
              </Button>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView> : <View></View>
    )
  }
}
let mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}
// export default Login
export default connect(mapStateToProps, {
  loginAccount
})(Login)