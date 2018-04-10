import React, { PureComponent } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Image, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import Button from '../commons/Button'
import { flexCenter } from '../commons/themes'
let { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  mainList: {
    display: "flex",
    flexDirection: 'column',
    padding: 3,
    paddingRight: 6,
    position: 'relative'
  },
  imageDim: {
    height: 58,
    width: 58,
    borderRadius: 29,
  },
  imgAva: {
    zIndex: 1001, position: 'absolute',
    top: 0, right: 0,
    margin: 2,
    // overflow: 'hidden'
  },
  imgWrapper: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#EEE'
  },
  round: {
    height: 8,
    width: 8,
    borderRadius: 1,
    backgroundColor: "#42b72a"
  },
  textLabel: {
    textAlign: 'center',
    fontSize: 12
  }
})

class ListItem extends PureComponent {
  render() {
    return (
      <View>
        <Button style={styles.mainList}>
          <Image
            source={{ uri: this.props.avatar }}
            resizeMode='cover'
            style={styles.imageDim}>
          </Image>
          <View style={[styles.imgAva]}>
            <View style={[flexCenter, styles.imgWrapper]}>
              <View style={styles.round}></View>
            </View>
          </View>
        </Button>
      </View >
    );
  }
}


class ListCircle extends PureComponent {
  constructor(props) {
    super(props)
  }
  renderRow(row) {
    console.log(row)
    return (
      <ListItem avatar={row.link} name={row.title} />
    )
  }
  render() {
    const { style } = this.props.style || {}
    return (
      <View style={{
        height: 70,
        backgroundColor: "#fff",
        borderColor: "#eee",
        borderBottomWidth: 1,
      }}>
        <FlatList
          data={this.props.data}
          extraData={this.state}
          pagingEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderRow(item)}
        />
      </View>
    )
  }
}
export default ListCircle;


