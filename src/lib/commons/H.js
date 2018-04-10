import React, { PureComponent } from 'react';
import { View, Text } from 'react-native'


class H extends PureComponent {
  render() {
    return (
      <Text
        numberOfLines={1}
        style={this.props.style}
      >{this.props.text}</Text>
    );
  }
}

class H1 extends PureComponent {
  render() {
    return (
      <H {...this.props} style={{ fontSize: 20, fontWeight: "bold", ...this.props.style }} />
    );
  }
}
class H2 extends PureComponent {
  render() {
    return (
      <H {...this.props} style={{ fontSize: 16, fontWeight: "bold", ...this.props.style }} />
    );
  }
}
class H3 extends PureComponent {
  render() {
    return (
      <H {...this.props} style={{ fontSize: 13.5, ...this.props.style }} />
    );
  }
}
class H4 extends PureComponent {
  render() {
    return (
      <H {...this.props} style={{ fontSize: 12, ...this.props.style }} />
    );
  }
}

export { H1, H2, H3, H4 };