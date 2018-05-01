import PureComponent from 'react'
import {
  CameraRoll,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native'

class RenderCamera extends PureComponent {
  constructor (props) {
    super(props)
  }
  renderCamera() {
    // ImagePicker.launchCamera({})
  }
  render() {
    return (
      <View style={{ flex: 1 }}>

      </View>
    )
  }
}

export default RenderCamera