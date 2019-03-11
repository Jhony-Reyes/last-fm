import React from 'react';
import { View } from 'react-native';
import { Bars } from 'react-native-loader';


export default () => (
  <View style={styles.container}>
    <Bars size={30} color="#ffffff" />
  </View>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10000',
  },
};
