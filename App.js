import React from 'react';
import {
  AppLoading, Asset, Font, Icon,
} from 'expo';
import { StyleProvider, Root } from 'native-base';

import AppNavigator from './navigation/AppNavigator';
import getTheme from './theme/components/index';
import variables from './theme/variables/material';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/logo.png'),
      require('./assets/images/splash.png'),
      require('./assets/images/tgbBgpnT.png'),
    ]),
    Font.loadAsync({
      ...Icon.Ionicons.font,
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }),
  ]);

  handleLoadingError = (error) => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <Root>
        <StyleProvider style={getTheme(variables)}>
          <AppNavigator />
        </StyleProvider>
      </Root>
    );
  }
}
