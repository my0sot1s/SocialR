import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Keyboard,
  StatusBar
} from 'react-native';
import { H1, H2, H3, H4 } from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import { flexCenter } from '../../lib/commons/themes'
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './PhotosPicker'
import { LogoTitle } from '../Comments/Comment'
import { connect } from 'react-redux'
import { getOwnerID } from '../../store/auth'
import uploadImageFiles, { uploadSingleVideo } from '../../api/upload'
import Modal from 'react-native-modal'
import Loading from '../../lib/commons/Loading'
import { sendCreatePost } from '../../api/post'
import HeaderCustom from '../../lib/commons/Header'
const { height, width } = Dimensions.get('window')

// const DoUpload = async (imgs) => {
//   let fileInfo = await uploadImageFiles(imgs)
//   return fileInfo
// }

class ModalInside extends PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    text: '',
    isVisibleModal: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  async doUploadPhotos(sender = []) {
    let imagesInfo = await uploadImageFiles(sender)
    let tagDefault = ['test', 'photos']
    let uid = this.props.uid
    let formOk = await sendCreatePost({
      tags: tagDefault,
      medias: imagesInfo,
      uid: uid,
      content: this.state.text
    })
  }
  async doUploadVideo(sender = {}) {
    let videoInfo = await uploadSingleVideo(sender)
    let tagDefault = ['test', 'video']
    let uid = this.props.uid
    let formOk = await sendCreatePost({
      tags: tagDefault,
      medias: [videoInfo],
      uid: uid,
      content: this.state.text
    })
  }
  async CreatePost() {
    Keyboard.dismiss()
    await this.setState({ isVisibleModal: true })
    // let { sender } = this.props.navigation.state.params
    let { sender } = this.props
    // if (!sender) this.props.navigation.goBack()
    if (sender.type === 'photos') await this.doUploadPhotos(sender.data)
    if (sender.type === 'video') await this.doUploadVideo(sender.data)
    this.setState({ isVisibleModal: false })
    this.props.closeUpload()
    this.props.navigation.navigate('Feeds')
  }
  render() {
    return (
      <View style={{
        flex: 1, backgroundColor: '#fff', width, height: 0.8 * height,
        top: 0.2 * height,
        left: -20,
        position: 'absolute',
        // left: -10,
      }}>
        {/* <StatusBar hidden /> */}
        <HeaderCustom style={{ height: 30 }}
          leftComponent={
            <Button onPress={() => this.props.closeUpload()}>
              <Icon name="ios-close" size={35} />
            </Button>}
          centerComponent={
            <LogoTitle text={"Create New Post".toUpperCase()}
              style={{ color: "#aaa" }} />
          } />
        <View style={[{
          height: 0.27 * height,
          borderColor: '#ccc',
          borderWidth: 1,
          marginVertical: 10
        }]}>
          <TextInput
            style={{
              height: 0.27 * height, width: '98%',
              marginHorizontal: 0.02 * width, fontSize: 14
            }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            multiline={true}
            returnKeyType={'done'}
            enablesReturnKeyAutomatically={true}
            placeholder={"Enter your caption"}>
          </TextInput>
        </View>
        <View style={[flexCenter, {
          height: 0.1 * height,
          borderTopColor: '#eee',
          borderTopWidth: 1,
          flexDirection: 'row'
        }]}>
          <Button style={[flexCenter, {
            flexBasis: '80%',
            padding: 5,
            marginHorizontal: 10,
            borderRadius: 5,
            height: 0.08 * height,
            backgroundColor: '#42b9f4'
          }]}
            onPress={this.CreatePost.bind(this)}>
            <Text style={{ fontSize: 15, color: '#5b5b5b' }} >Publish</Text>
          </Button>
        </View>
        <Modal isVisible={this.state.isVisibleModal}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <Loading type="ChasingDots" style={{ backgroundColor: 'transparent' }} />
          </View>
        </Modal>
      </View>
    );
  }
}
let mapStateToProps = state => {
  return {
    uid: getOwnerID(state)
  }
}
export default connect(mapStateToProps)(ModalInside)