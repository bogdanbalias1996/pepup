/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

import {connect} from 'react-redux';
import * as Font from 'expo-font';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {getStore} from './src/configureStore';
import {authenticate} from './src/common/utils/session';
import {setTopLevelNavigator} from './src/navigationService';
import {Loader} from './src/components/Loader/Loader';
import {IGlobalState} from './src/coreTypes';

import {AuthenticationNavigator} from './src/navigators/AuthenticationNavigator';
import {MainNavigator} from './src/navigators/MainNavigator';
import {PagesNavigator} from './src/navigators/PagesNavigator';
import {colorBlueberry} from './src/variables';

const AppNavigator = createSwitchNavigator(
  {
    Pages: PagesNavigator,
    Auth: AuthenticationNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Pages',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const AppWithFontLoadedComponent = ({isFontLoaded}) => {
  return (
    <Loader color={colorBlueberry} isDataLoaded={isFontLoaded}>
      <AppContainer
        ref={(navigatorRef: any) => {
          setTopLevelNavigator(navigatorRef);
          authenticate();
        }}
      />
    </Loader>
  );
};

const AppWithFontLoaded = connect((state: IGlobalState) => ({
  isFontLoaded: state.FontState.isFontLoaded,
}))(AppWithFontLoadedComponent);

export default class App extends Component {
  async componentDidMount() {
    await Font.loadAsync({
      'brackit-font': require('./assets/fonts/icon-font/brackit_icons.ttf'),
      'montserrat-medium': require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
      'montserrat-bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
      'montserrat-semibold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
      'montserrat-italic': require('./assets/fonts/montserrat/Montserrat-MediumItalic.ttf'),
    });

    getStore().dispatch({
      type: 'FONT_LOADED',
    });

    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title: any, body: any) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  render() {
    return (
      <Provider store={getStore()}>
        <AppWithFontLoaded />
      </Provider>
    );
  }
}
