import React from 'react';
import { Platform, Keyboard } from 'react-native';
import { BottomTabBar } from 'react-navigation'; // need version 2.0 react-navigation of course... it comes preinstalled as a dependency of react-navigation.

export default class TabBarComponent extends React.Component {
  state = {
    visible: true,
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', this.visible(false)),
        Keyboard.addListener('keyboardDidHide', this.visible(true)),
      ];
    }
  }

  componentWillUnmount() {
    return this.keyboardEventListeners
    && this.keyboardEventListeners.forEach(eventListener => eventListener.remove());
  }

  visible = visible => () => this.setState({ visible });

  render() {
    const { visible } = this.state;
    if (!visible) {
      return null;
    }
    return (
      <BottomTabBar {...this.props} />
    );
  }
}
