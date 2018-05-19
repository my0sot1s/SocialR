import React, { Component } from 'react'
import { View, StyleSheet, AlertIOS, Dimensions } from 'react-native'
import Video from 'react-native-video'
import Button from '../commons/Button'
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('window')
var styles = StyleSheet.create({
  backgroundVideo: {
    width,
    height: 250
  },
  status: {
    position: 'absolute',
    bottom: 15,
    left: 15
  }
})
class VideoPlay extends Component {
  constructor(props) {
    super(props)
    this.onLoad = this.onLoad.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onBuffer = this.onBuffer.bind(this)
    this.getCurrentTimePercentage = this.getCurrentTimePercentage.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: true,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
  };
  onLoad(data) {
    this.setState({ duration: data.duration });
  }

  onProgress(data) {
    this.setState({ currentTime: data.currentTime });
  }

  onBuffer({ isBuffering }) {
    this.setState({ isBuffering })
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }
  onEnd() {
    // AlertIOS.alert('Done!')
  }
  pauseVideo() {
    this.setState({ paused: !this.state.paused })
  }

  render() {
    // let source = this.props.video ? { url: this.props.video.url }
    //   : require('../../assets/ngan_nguyen.mp4')
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <Button onPress={this.pauseVideo.bind(this)} activeOpacity={1}>
          <Video source={this.props.source}
            // poster="https://baconmockup.com/300/200/"
            ref={(ref) => {
              this.player = ref
            }}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={this.state.paused}
            repeat={true}
            playInBackground={false}
            playWhenInactive={false}
            ignoreSilentSwitch={"ignore"}
            progressUpdateInterval={250.0}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onBuffer={this.onBuffer}
            style={[styles.backgroundVideo, this.props.style || {}]} />
        </Button>
        {
          this.state.paused ? < Ionicons name="ios-pause"
            color="rgba(254,254,254,0.4)" size={25} style={styles.status} /> :
            <Ionicons name="ios-play"
              color="rgba(254,254,254,0.4)" size={25} style={styles.status} />
        }
      </View>
    )
  }
}

export default VideoPlay
