import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Keyboard,
  Dimensions,
  AlertIOS
} from 'react-native'
import { H1, H2, H3 } from '../../lib/commons/H'
import { flexCenter } from '../../lib/commons/themes'
import EditTextHighlight from '../../lib/commons/EditText'
import Button from '../../lib/commons/Button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { loginAccount, logoutAccount } from '../../store/auth'
import { GetStorageByKey } from '../../config/configureStore'
import Modal from 'react-native-modal'
import Loading from '../../lib/commons/Loading'
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
    isHandler: false,
    isLoginPendding: false
  }
  async componentDidMount() {
    // this.props.logoutAccount()
    let loginInfo = await GetStorageByKey('LOGIN')
    if (!loginInfo || !loginInfo.hasOwnProperty('username')
      || !loginInfo.hasOwnProperty('password')) {
      this.setState({ isHandler: true })
      return
    }
    await this.props.loginAccount(loginInfo.username, loginInfo.password)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.setState({ isLoginPendding: false })
      this.props.navigation.navigate('App')
    }
    else if (nextProps.error) {
      this.setState({ isLoginPendding: false })
    }
  }

  async loginToApp() {
    Keyboard.dismiss
    let { username, password } = this.state
    this.setState({ isLoginPendding: true })
    await this.props.loginAccount(username, password)
  }
  changeUsername(user) {
    this.setState(prevState => ({ username: user }))
  }
  changePassword(pw) {
    this.setState(prevState => ({ password: pw }))
  }
  render() {
    let { isHandler, isLoginPendding } = this.state
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
              {this.props.error ? <H3 text='Login incorrect' style={{
                marginVertical: 10,
                color: 'red',
                fontFamily: 'Helvetica'
              }} /> : null}
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
              <Button onPress={() => this.props.navigation.navigate('Register')}
                style={{ backgroundColor: 'transparent', marginTop: 5 }}>
                <H3 text={"register".toUpperCase()} style={{
                  color: '#fff',
                  paddingVertical: 15,
                  fontFamily: 'Helvetica',
                  textDecorationLine: 'underline'
                }} />
              </Button>
            </View>
            <Modal isVisible={isLoginPendding}>
              <Loading type='ThreeBounce' style={{ backgroundColor: 'transparent' }} />
            </Modal>
          </ImageBackground>
        </KeyboardAwareScrollView> : <View></View>
    )
  }
}
let mapStateToProps = state => {
  return {
    token: state.auth.token,
    error: state.auth.error
  }
}
// export default Login
export default connect(mapStateToProps, {
  loginAccount,
  logoutAccount
})(Login)