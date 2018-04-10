import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native'
import Profile from '../lib/Profile'
import ScrollTabIcon, { ScrollViewItem, styles } from '../lib/TabBar/ScrollTabIcon'

const { width } = Dimensions.get('screen')
class ProfileInfo extends PureComponent {
  render() {
    return (
      <View style={{ height: "100%" }}>
        <Profile
          avatar={"http://res.cloudinary.com/telosma/image/upload/t_media_lib_thumb/v1511028325/%40hoaitt_33/common/omgdczudzgywa3llotjq.jpg"} />
      </View >
    );
  }
}

export default ProfileInfo