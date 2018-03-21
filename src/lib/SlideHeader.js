import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { flexCenter } from './themes'
import Button from './Button'
import { H3, H4 } from './H'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    height: 45,
    width: "100%",
    justifyContent: "flex-start"
  },
  imageWrap: {
    flexBasis: "15%"
  },
  imageMode: {
    height: 32,
    width: 32,
    borderRadius: 16
  },
  headerText: {
    flexBasis: "70%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  titleName: {
    height: 25,
    padding: 0,
    justifyContent: "flex-start"
  },
  date: {
    height: 15
  },
  icon: {
    flexBasis: "10%",
    alignItems: 'flex-end',
    textAlign: 'center'
  }
})
class CardHeader extends PureComponent {
  render() {
    return (
      <View style={[flexCenter, styles.container]}>
        <Button style={[flexCenter, styles.imageWrap]}>
          <Image source={{ uri: this.props.data.avatar }}
            style={styles.imageMode}
            resizeMode='cover' />
        </Button>

        <View style={[flexCenter, styles.headerText]}>
          <Button style={[flexCenter, styles.titleName]}>
            <H3 text={this.props.data.username} style={{ fontWeight: "bold" }} />
          </Button>
        </View>
        <Ionicons name='ios-more' size={23} color='#696969' style={styles.icon} />
      </View>
    );
  }
}

export default CardHeader;
