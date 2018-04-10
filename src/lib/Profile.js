import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { flexCenter } from './commons/themes'
import { H1, H2, H3, H4 } from './commons/H'
import Button from './commons/Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    height: 100,
    marginHorizontal: '2.5%'
  },
  avatar: {
    flexBasis: "30%",
    height: "100%",
    flexWrap: 'wrap',
    marginTop: 2
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#3097D1'
  },
  right: {
    flexBasis: "60%",
    height: 70,
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-start"
  },
  top: {
    height: 40,
    flexBasis: "100%",
    width: "100%",
    flexDirection: "column"
  },
  bottom: {
    height: 40,
  },
  btnFollow: {
    width: '45%',
    borderWidth: 1,
    borderColor: '#f4f4f4',
    borderRadius: 3,
    flexBasis: "60%",
    backgroundColor: "#adafa8"
  },
  btnEdit: {
    width: '20%',
    borderWidth: 1,
    borderColor: '#3097D1',
    padding: 2,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  options: {
    flexBasis: "10%",
    marginHorizontal: 5
  }

});
function RenderDetail(props) {
  return (
    <View style={[flexCenter, styles.top, props.style]}>
      <H2 text={props.type} style={{ color: "#696969" }} />
      <H1 text={props.count} style={{ fontWeight: "bold" }} />
    </View>
  )
}
class Profile extends PureComponent {
  render() {
    return (
      <View style={[flexCenter, { flexWrap: 'wrap', marginTop: 20 }]}>
        <View style={[styles.container, flexCenter, this.props.style]}>
          <View style={[styles.avatar, flexCenter]}>
            <View style={[styles.detail]}>
              <RenderDetail count={120} type="POST" />
            </View>
          </View>
          <View style={[styles.avatar, flexCenter]}>
            <Image source={{ uri: this.props.avatar }}
              style={styles.image} resizeMode="cover" />
          </View>
          <View style={[styles.avatar, flexCenter]}>
            <View style={[styles.detail]}>
              <RenderDetail count={120} type="FOLLOWING" />
            </View>
          </View>
        </View>
        <View style={[flexCenter, styles.bottom]}>
          <Button style={[styles.btnFollow]} >
            <H3 text="FOLLOW" style={{ color: "#fff", fontWeight: 'bold', paddingVertical: 5 }} />
            {/* <Icon name="check" size={20} style={{ color: "#fff", fontWeight: 'bold' }} /> */}
          </Button>
        </View>
      </View>
    );
  }
}

Profile.defaultProps = {
  avatar: `http://res.cloudinary.com/telosma/image/upload/v1511030229/%40hoaitt_33/common/n47cag7hsgmug3kszu53.jpg`
};

export default Profile;
