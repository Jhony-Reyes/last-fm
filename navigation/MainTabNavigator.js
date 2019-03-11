import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import { TabBarIcon } from '../common/components';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginSceen from '../screens/auth/Login/LoginScreen'
import { TabBar } from '../common/components'

const AuthStack = createStackNavigator({
  Login: LoginSceen,
}, {
  headerMode: 'none'
})

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  headerMode: 'none'
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="home"
    />
  ),

};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
}, {
  headerMode: 'none'
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="search"
    />
  ),
};

export const BottomStack = createBottomTabNavigator({
  HomeStack,
  SearchStack,
}, {
  tabBarOptions: {
    activeTintColor: '#F10000',
  },
  backBehavior: 'none',
  tabBarComponent: props => <TabBar {...props} />,
  tabBarPosition: 'bottom'
});

BottomStack.navigationOptions = {
  tabBarVisible: false,
}

export default createSwitchNavigator({
  AuthStack,
  BottomStack,
}, {
  headerMode: 'none'
})
