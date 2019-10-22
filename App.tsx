/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Alert, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';
import * as Font from 'expo-font';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Provider, connect} from 'react-redux';
import {getStore} from './src/configureStore';
import {setTopLevelNavigator, navigate} from './src/navigationService';
import {Loader} from './src/components/Loader/Loader';
import {IGlobalState} from './src/coreTypes';

import {AuthenticationNavigator} from './src/navigators/AuthenticationNavigator';
import {MainNavigator} from './src/navigators/MainNavigator';
import {PagesNavigator} from './src/navigators/PagesNavigator';
import {OnboardingNavigator} from './src/navigators/OnboardingNavigator';
import {colorBlueberry} from './src/variables';
import {SuccessfulAlert} from './src/components/SuccessfulAlert/SuccessfulAlert';
import {ErrorModal} from './src/components/ErrorState/ErrorState';
import {setInternetConnection} from './src/utils/connectionCheck/actions';
import {openError, closeError} from './src/pages/ErrorModal/actions';
import {authenticate} from './src/common/utils/session';

const AppNavigator = createSwitchNavigator(
  {
    Onboarding: OnboardingNavigator,
    Pages: PagesNavigator,
    Auth: AuthenticationNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Onboarding',
  },
);

const AppContainer = createAppContainer(AppNavigator);

const AppWithFontLoadedComponent = ({isFontLoaded}: any) => {
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
  messageListener!: () => any;
  async componentDidMount(): Promise<any> {
    await NetInfo.fetch().then(state => {
      getStore().dispatch(setInternetConnection(state.isConnected));
    });

    await NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        getStore().dispatch(
          openError({
            type: 'connectionFail',
            onPress: () => {
              getStore().dispatch(closeError());
              navigate({routeName: 'Login'});
            },
          }),
        );
      }
    });

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
  notificationListener() {
    throw new Error('Method not implemented.');
  }
  notificationOpenedListener() {
    throw new Error('Method not implemented.');
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
        <StatusBar barStyle="light-content" />
        <AppWithFontLoaded />
        <SuccessfulAlert />
        <ErrorModal />
      </Provider>
    );
  }
}
