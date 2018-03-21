import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { theme, flexCenter } from "./themes";

const btnStyle = {
  padding: theme.defaultPadding
};

export default class Button extends React.PureComponent {

  constructor() {
    super();
    this.handlePressButton = this.handlePressButton.bind(this)
  }

  handlePressButton() {
    requestAnimationFrame(() => this.props.onPress && this.props.onPress())
  }

  render() {
    return (
      <TouchableOpacity
        style={[btnStyle, this.props.style]}
        onPress={this.handlePressButton}
        {...this.props}
      >
        <View style={flexCenter}>
          {this.props.children}
        </View>
      </TouchableOpacity>
    )
  }
}