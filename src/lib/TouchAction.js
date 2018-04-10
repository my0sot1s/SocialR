import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Clipboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Share, { ShareSheet, Button } from 'react-native-share';
import { H3, H2, H4 } from './commons/H'
import ShareSheetAction from './commons/ShareSheetAction'
import ZButton from './commons/Button';
const cloneDeep = require('lodash/cloneDeep')
const objectPath = require('object-path')

// https://github.com/EstebanFuentealba/react-native-share
const styles = StyleSheet.create({
  container: {
    height: 35,
    width: '100%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    // marginHorizontal: 12
  },
  common: {
    // flex: 1,
    flexBasis: '15%'
  },
  bigger: {
    // flex: 5,
    flexBasis: '50%',
    paddingRight: 30
  },
  bold: {
    fontWeight: 'bold'
  }
})
class TouchAction extends PureComponent {
  state = {
    visible: false,
    shareOptions: {}
  }
  onCancel() {
    console.log("CANCEL")
    this.setState({ visible: false });
  }
  onOpen() {
    console.log("OPEN")
    this.setState({ visible: true });
  }
  shareOptions = {
    title: "React Native",
    message: "Hola mundo",
    url: "http://facebook.github.io/react-native/",
    subject: "Share Link" //  for email
  };
  Shared() {
    Share.open(this.shareOptions);
  }
  sendToComment() {
    this.props.navigation.navigate('Comment')
  }
  render() {
    let tag = ''
    objectPath.get(this.props, 'tags', []).forEach(v => {
      tag += ` #${v} `
    })
    let iconDefined = ['ios-quote-outline','ios-send-outline','ios-bookmark-outline']
    let eventDefined = [this.sendToComment.bind(this),this.Shared.bind(this),this.Shared.bind(this)]
    return (
      <View style={[styles.container, { flexDirection: 'column', height: 75, marginTop: 3 }]}>
        <View style={styles.container}>
          {iconDefined.map((icon,index) =>
          <View style={[styles.common, styles.container, { flexBasis: '30%' }]} key={index}>
            <ZButton onPress={eventDefined[index]}>
              <Icon name={icon} size={30} style={styles.bold} />
            </ZButton>
          </View>)}
          {/* <View style={[styles.common, styles.container, { flexBasis: '30%' }]}>
            <ZButton onPress={} >
              <Icon name={"ios-send-outline"} size={33} style={styles.bold} />
            </ZButton>
          </View>
          <View style={[styles.common, styles.container, { flexBasis: '30%' }]}>
            <ZButton onPress={} >
              <Icon name={"ios-bookmark-outline"} size={30} style={styles.bold} />
            </ZButton>
          </View> */}
        </View>
        <View style={[styles.container, { flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 15, marginTop: 10 }]}>
          <H2 text={this.props.text} style={{ color: '#545454' }} />
          <H4 text="View to comment ... " style={{ color: '#a3a3a3', paddingVertical: 2 }} />
        </View>
        <ShareSheetAction visible={this.state.visible} onCancel={this.onCancel.bind(this)} />
      </View>
    );
  }
}

export default TouchAction;
