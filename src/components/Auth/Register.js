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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { registerAccount } from '../../store/auth'
import { register } from '../../api/auth'
import { GetStorageByKey } from '../../config/configureStore'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import uploadImageFiles, { uploadSingleImage } from '../../api/upload'
import { checkImage } from '../../utils/func'
import Modal from 'react-native-modal'
import Loading from '../../lib/commons/Loading'
const { width, height } = Dimensions.get('window')
const objectPath = require('object-path')
class Register extends Component {
  constructor(props) {
    super(props)
    this.scroll = null
  }
  static navigationOptions = {
    // title: null,
    header: null
  }
  state = {
    register: null,
    username: '',
    fullname: '',
    password: '',
    rePassword: '',
    isHandler: false,
    email: '',
    avatar: {},
    uploading: false,
    isRegisterPending: false,
    error: false
  }
  async pickerAvatar() {
    let options = {
      title: 'Select Avatar',
      customButtons: [
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    await ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        this.setState({
          uploading: true,
          avatar: {}
        })
        let source = { uri: response.uri }
        if (!checkImage(response.uri)) return
        this.setState({
          uploading: false,
          avatar: {
            uri: response.origURL,
            filename: response.fileName
          }
        })
      }
    })
  }

  async registerToApp() {
    Keyboard.dismiss
    let { username, password, rePassword, fullname, avatar, email } = this.state
    if (!username || !password || !rePassword || !fullname || !avatar || !email) {
      alert('Some fields is empty')
      return
    }
    if (password.length < 6) {
      alert('Password less 6 characters')
      return
    }
    if (rePassword !== password) {
      alert('Password not equal repassword')
      return
    }
    if (!avatar.uri) {
      alert('Avatar is require')
      return
    }
    this.setState({ isRegisterPending: true })
    let mediasUploaded = await uploadSingleImage(avatar)
    let data = await register(username, password, email, fullname, mediasUploaded.url)
    if (objectPath.get(data, 'user')) {
      await this.setState({ isRegisterPending: false })
      // alert('Resgister success\n Please confirm with your email')
      this.props.navigation.goBack()
    } else {
      await this.setState({ error: true, isRegisterPending: false })
    }
  }
  changeUsername(user) {
    this.setState(prevState => ({ username: user }))
  }
  changePassword(pw) {
    this.setState(prevState => ({ password: pw }))
  }
  changeRePassword(pw) {
    this.setState(prevState => ({ rePassword: pw }))
  }
  changeFullname(fullname) {
    this.setState(prevState => ({ fullname }))
  }
  changeEmail(email) {
    this.setState(prevState => ({ email }))
  }
  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "#fff" }}
        scrollEnabled={false}>
        <ImageBackground blurRadius={1}
          source={require('../../assets/bg.jpg')}
          style={{ width, height }}>
          <View style={{
            flex: 1, marginTop: 0.12 * height, marginHorizontal: 20,
            backgroundColor: 'transparent'
          }}>
            {this.state.error ? <H3 text='Register incorrect' style={{
              marginVertical: 10,
              color: 'red',
              fontFamily: 'Helvetica'
            }} /> : null}
            <View style={[flexCenter]}>
              <View style={[flexCenter, { flex: 1 }]}>
                <Button onPress={this.pickerAvatar.bind(this)}
                  style={{ backgroundColor: 'transparent', marginTop: 5, height: '100%' }}>
                  {!objectPath.get(this.state.avatar, 'uri') ?
                    <Icon name="md-person-add" size={30} color="#eee" /> :
                    <Image source={{ uri: this.state.avatar.uri }} resizeMode="cover"
                      style={{ height: 70, width: 70, borderRadius: 35 }} />}
                </Button>
              </View>
              <View style={[flexCenter, { flex: 2.3, flexDirection: 'column' }]}>
                <H3 text={"Full Name:".toUpperCase()} style={{
                  marginVertical: 5,
                  color: '#ccc',
                  fontFamily: 'Helvetica'
                }} />
                <EditTextHighlight
                  onChangeText={this.changeFullname.bind(this)}
                  autoCapitalize='none'
                  addition={{ padding: 8, fontSize: 16, width: '100%' }}
                  value={this.state.fullname}
                />
                <H3 text={"Email:".toUpperCase()} style={{
                  marginVertical: 5,
                  color: '#ccc',
                  fontFamily: 'Helvetica'
                }} />
                <EditTextHighlight
                  onChangeText={this.changeEmail.bind(this)}
                  autoCapitalize='none'
                  addition={{ padding: 8, fontSize: 16, width: '100%' }}
                  value={this.state.email}
                />
              </View>
            </View>
            <H3 text={"User Name:".toUpperCase()} style={{
              marginVertical: 5,
              color: '#ccc',
              fontFamily: 'Helvetica'
            }} />
            <EditTextHighlight
              onChangeText={this.changeUsername.bind(this)}
              autoCapitalize='none'
              addition={{ padding: 8, fontSize: 16, }}
              value={this.state.username}
            />
            <H3 text={"Password:".toUpperCase()} style={{
              marginVertical: 5,
              color: '#ccc',
              fontFamily: 'Helvetica'
            }} />
            <EditTextHighlight secureTextEntry onChangeText={this.changePassword.bind(this)}
              addition={{ padding: 8, fontSize: 16 }}
              value={this.state.password}
            />
            <H3 text={"Retype password:".toUpperCase()} style={{
              marginVertical: 5,
              color: '#ccc',
              fontFamily: 'Helvetica'
            }} />
            <EditTextHighlight secureTextEntry onChangeText={this.changeRePassword.bind(this)}
              addition={{ padding: 8, fontSize: 16 }}
              value={this.state.rePassword}
            />
            <Button onPress={this.registerToApp.bind(this)}
              style={{ backgroundColor: '#3097d2', marginTop: 30 }}>
              <H3 text={"Register".toUpperCase()} style={{
                color: '#fff', paddingVertical: 15,
                fontFamily: 'Helvetica'
              }} />
            </Button>
            <Button onPress={() => this.props.navigation.goBack()}
              style={{ backgroundColor: 'transparent', marginTop: 5 }}>
              <H3 text={"Login".toUpperCase()} style={{
                color: '#fff',
                paddingVertical: 15,
                fontFamily: 'Helvetica',
                textDecorationLine: 'underline'
              }} />
            </Button>
          </View>
          <Modal isVisible={this.state.isRegisterPending}>
            <Loading type='ThreeBounce' style={{ backgroundColor: 'transparent' }} />
          </Modal>
        </ImageBackground>
      </KeyboardAwareScrollView>
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
  registerAccount
})(Register)