import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
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
  render() {
    return (
      <View style={[styles.container, { flexDirection: 'column', height: 75 }]}>
        <View style={styles.container}>
          <View style={[styles.common, styles.container]}><Icon name={"ios-heart-outline"} size={27} style={styles.bold} /></View>
          <View style={[styles.common, styles.container]}><Icon name={"ios-undo-outline"} size={27} style={styles.bold} /></View>
          <View style={[styles.common, styles.container, { flexBasis: '20%' }]}></View>
          <View style={[styles.bigger, styles.container, { justifyContent: 'flex-end' }]}><Icon name={"ios-bookmark"} size={27} /></View>
        </View>
        <View style={[styles.container, { flexDirection: 'column', height: 40, alignItems: 'flex-start', paddingLeft: 15 }]}>
          <Text style={{ textAlign: 'left', fontSize: 14, color: '#545454', fontWeight: 'bold' }}>{this.props.text}</Text>
          <Text style={{ textAlign: 'left', color: '#a3a3a3', fontSize: 13 }}>View to comment ... <Text style={{ textAlign: 'right', fontSize: 12, color: '#545454', fontWeight: 'bold' }}>100 liked</Text></Text>
          <Text style={{ textAlign: 'left', color: '#545454', fontSize: 13, fontWeight: 'bold' }}>#color, #ack, #tenguyen</Text>
        </View>
      </View>
    );
  }
}

export default TouchAction;