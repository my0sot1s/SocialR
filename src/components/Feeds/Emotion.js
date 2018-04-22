import React from 'react'
import {
  View, Image,
  StyleSheet,
  Text,
  PixelRatio,
  TouchableOpacity,
} from 'react-native'

import ListCircleAction from '../../lib/CircleList'
import ImagePicker from 'react-native-image-picker'
import { addEmotion } from '../../api/emotion'
import { checkImage } from '../../utils/func'
// More info on all the options is below in the README...just some common use cases shown here
import uploadImageFiles from '../../api/upload'
import Loading from '../../lib/commons/BottomLoader'

class Emotions extends React.PureComponent {
  state = {
    avatarSource: '',
    uploading: false
  }
  async selectPhotoTapped() {
    let options = {
      title: 'Select Emotion',
      customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' }
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
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({
          uploading: true
        })
        let source = { uri: response.uri }

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (!checkImage(response.uri)) return

        let mediasUploaded = await uploadImageFiles([{
          uri: response.origURL,
          filename: response.fileName
        }])
        console.log('log', JSON.stringify(mediasUploaded))
        await addEmotion(this.props.uid, mediasUploaded)
        this.setState({
          uploading: false
        })
      }
    })


  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {!this.state.uploading ?
          <ListCircleAction data={this.props.emotions}
            clickChooseImage={this.selectPhotoTapped.bind(this)} />
          : <Loading />}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});

export default Emotions
