import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native'
import { flexCenter } from './commons/themes'

class MediaLoading extends Component {
  render() {
    return (
      <ActivityIndicator size={this.props.size || 'large'} color="black" />
    );
  }
}

export default MediaLoading;