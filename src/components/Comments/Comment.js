import React, { Component } from 'react'
import {View} from 'react-native'
import {H2,H1} from '../../lib/commons/H'
import Button from '../../lib/commons/Button'
import ListActivities from '../../lib/ListViewAvatar'
import Icon from 'react-native-vector-icons/MaterialIcons'
const LogoTitle = (props) => <H2 text={props.text || "Comments"}/>

class Comment extends Component {
  static navigationOptions = ({navigation}) => {
    return {
    headerTitle: <LogoTitle text="Comment #"/>,
    headerLeft: (
      <Button onPress={ () => navigation.goBack()}>
        <Icon name="label" size={50} style={{transform:[{ rotate: '180deg'}]}} color="#ccc"/>
      </Button>
    )}
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <ListActivities type={'no-image'} />
      </View>
    )
  }
}

export default Comment
