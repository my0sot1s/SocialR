import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import Button from '../../lib/commons/Button'
import { H2, H3 } from '../../lib/commons/H'
import { flexCenter } from '../../lib/commons/themes'
import EditTextHighlight from '../../lib/commons/EditText'
import { resizeImageByWidth } from '../../utils/func'
import CircleImage from '../../lib/commons/CircleImage'
const { width } = Dimensions.get('screen')
class CommentBox extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  state = {
    text: ''
  }
  async handleSubmit() {
    let { text } = this.state
    if (!text) return
    await this.props.handleSubmit(text)
    this.setState({ text: '' })
  }
  changeText(text) {
    this.setState({ text })
  }
  render() {
    return (
      <View style={[flexCenter, this.props.style]}>
        <View style={[flexCenter, { flexBasis: '12%' }]}>
          <CircleImage source={{ uri: resizeImageByWidth(this.props.user.avatar, width / 6) }}
            size={24}
            resizeMode="cover" />
        </View>
        <EditTextHighlight controlled={true}
          onChangeText={this.changeText.bind(this)}
          autoFocus={true}
          style={{
            flexBasis: '72%',
            // borderWidth: 1,
            // borderColor: '#aaa',
            padding: 10,
            borderRadius: 3
          }}
          spellCheck={false}
          isFocused={true}
          placeholder="Write your comment..."
          value={this.state.text}
        />
        <Button style={{
          flexBasis: '14%',
          backgroundColor: '#3097d2',
          marginHorizontal: 4,
          paddingVertical: 10,
          borderRadius: 2
        }} onPress={this.handleSubmit.bind(this)}>
          <H3 text="GO" style={{ color: '#fff' }} />
        </Button>
      </View>
    )
  }
}

export default CommentBox