import React from 'react'
import {
  Platform, View, ScrollView, SafeAreaView,
  StatusBar, TouchableOpacity, Image,
  Dimensions
} from 'react-native'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import { sliderWidth, itemWidth, styles, slideHeight } from './calculate'
import { scrollInterpolators, animatedStyles } from '../../lib/SliderSnap/animations'
import Search from '../Search/Search'
import { getAllExplores, fetchExploreAll, getCurrentExploresLock } from '../../store/explore'
import { getUsers } from '../../store/user'
import { getOwnerID } from '../../store/auth'
import { connect } from 'react-redux'
import BottomLoader from '../../lib/commons/BottomLoader'
import { getUsersEmotion } from '../../store/emotion'
import OtherEmotion from '../Feeds/Emotion'
import { resizeImageByWidth } from '../../utils/func'
import { Ex2Ex, Ex } from './ChildComponents'
import Modal from 'react-native-modal'
import Loading from '../../lib/commons/Loading'
const objectPath = require('object-path')

class ExEx extends React.PureComponent {
  constructor(props) {
    super(props)
    this.checkSlideShow = this.checkSlideShow.bind(this)
  }
  state = {
    imageBackground: ''
  }
  static navigationOptions() {
    return {
      header: null,
      isSearching: false,
      loadding: false
    }
  }
  async componentDidMount() {
    this.setState({ loadding: true })
    await this.props.fetchExploreAll()
  }
  componentWillReceiveProps(newProps) {
    this.state.loadding && newProps.explores.length > 0 && this.setState({ loadding: false })
  }
  async checkSlideShow(index) {
    console.log('index', index)
    if (index + 3 === objectPath.get(this.props, 'explores', []).length) {
      this.fetchMore()
    }
  }
  async fetchMore() {
    if (!this.props.locked)
      await this.props.fetchExploreAll()
  }
  searchingData(s) {
    this.setState({ isSearching: s })
  }
  render() {
    let { explores, emotions, users } = this.props
    let { imageBackground, isSearching } = this.state
    return (
      <View style={[styles.container]}>
        <StatusBar
          translucent={true}
          backgroundColor={'#eee'}
          barStyle={'light-content'}
        />
        <Modal isVisible={this.state.loadding}>
          <Loading type='ThreeBounce' style={{ backgroundColor: 'transparent' }} />
        </Modal>
        <View style={isSearching ? { flex: 1 } : styles.otherSide}>
          <Search emotions={emotions} 
          searchingData={this.searchingData.bind(this)}
          navigation={this.props.navigation} />
        </View>
        {
          explores && explores.length > 0 ? <Ex
            data={explores}
            itemHeight={slideHeight}
            sliderHeight={slideHeight * 1.2}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            vertical={true}
            renderItem={({ item }) =>
              <Ex2Ex data={item} even={false} users={users}
                navigation={this.props.navigation} />}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            refNumber={2}
            onSnapToItem={(index) => this.checkSlideShow(index)}
          /> : <View />
        }
      </View >
    )
  }
}

let mapStateToProps = state => {
  return {
    users: getUsers(state),
    locked: getCurrentExploresLock(state),
    uid: getOwnerID(state),
    explores: getAllExplores(state),
    emotions: getUsersEmotion(state)
  }
}
export default connect(mapStateToProps, {
  fetchExploreAll
})(ExEx)
