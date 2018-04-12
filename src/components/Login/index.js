import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
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
const { width } = Dimensions.get('window')

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
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) this.props.navigation.navigate('App')
  }

  loginToApp() {
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
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}>
        <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20, backgroundColor: '#fff' }}>
          <H1 text="LOGIN FORM"
            style={{
              textAlign: 'center',
              marginBottom: 20,
              color: '#aaa',
              fontWeight: 'normal',
              fontFamily: 'Kailasa'
            }} />
          <Image source={require('./login_top.jpg')} style={{
            width: width - 40,
            height: 120,
            marginBottom: 20
          }} resizeMode="cover" />
          <H3 text={"UserName:".toUpperCase()} style={{
            marginVertical: 10,
            color: '#ccc',
            fontFamily: 'Helvetica'
          }} />
          <EditTextHighlight onChangeText={this.changeUsername.bind(this)}
            value={this.state.username}
          />
          <H3 text={"Password:".toUpperCase()} style={{
            marginVertical: 10,
            color: '#ccc',
            fontFamily: 'Helvetica'
          }} />
          <EditTextHighlight secureTextEntry onChangeText={this.changePassword.bind(this)}
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
      </KeyboardAwareScrollView>
    );
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