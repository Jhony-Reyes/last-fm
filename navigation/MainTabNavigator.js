import React from 'react';
import {
  createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator,
} from 'react-navigation';

import { TabBarIcon } from '../common/components';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LoginSceen from '../screens/auth/Login/LoginScreen';
import Colors from '../constants/Colors';

const AuthStack = createStackNavigator({
  Login: LoginSceen,
}, {
  headerMode: 'none',
});

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  headerMode: 'none',
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
  headerMode: 'none',
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

const BottomStack = createMaterialTopTabNavigator({
  HomeStack,
  SearchStack,
}, {
  backBehavior: 'none',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    inactiveTintColor: Colors.inactiveTintColor,
    showIcon: true,
    indicatorStyle: { backgroundColor: 'transparent' },
    style: { backgroundColor: '#FFFFFF', elevation: 10 },
    pressColor: Colors.tintColor,
    labelStyle: {
      fontSize: 12,
      margin: 0,
    },
  },
});

export default createSwitchNavigator({
  AuthStack,
  BottomStack,
}, {
  headerMode: 'none',
});
