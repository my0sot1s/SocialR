import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from "./themes";

class EditTextHighLightFocus extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      focused: false
    }
  }

  render() {
    return (
      <TextInput
        underlineColorAndroid="transparent"
        style={[styles.formControl,
        { borderColor: this.state.focused ? theme.primaryColor : theme.divider },
        this.props.addition]}
        onFocus={() => this.setState({ focused: true })}
        onBlur={() => this.setState({ focused: false })}
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  formControl: {
    borderWidth: 1,
    borderColor: theme.divider,
    padding: 8,
    borderRadius: theme.radius
  }
});

export default EditTextHighLightFocus;