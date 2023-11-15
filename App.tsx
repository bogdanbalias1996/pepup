import React, { Component } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';
import * as Font from 'expo-font';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { getStore } from './src/configureStore';
import { setTopLevelNavigator, navigate } from './src/navigationService';
import { Loader } from './src/components/Loader/Loader';
import { IGlobalState } from './src/coreTypes';
import SplashScreen from 'react-native-splash-screen';
import NotificationPopup from 'react-native-push-notification-popup';

import { AuthenticationNavigator } from './src/navigators/AuthenticationNavigator';
import { MainNavigator } from './src/navigators/MainNavigator';
import { colorLightOrange } from './src/variables';
import { SuccessfulAlert } from './src/components/SuccessfulAlert/SuccessfulAlert';
import { ErrorModal } from './src/components/ErrorState/ErrorState';
import { setInternetConnection } from './src/utils/connectionCheck/actions';
import { openError, closeError } from './src/pages/ErrorModal/actions';
import { LoadingScreen } from './src/pages/Loading/Loading';
import { OnboardingScreen } from './src/pages/Onboarding/Onboarding';
import { authenticate } from './src/common/utils/session';

YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const FCM_TOKEN = 'fcmToken';
const AppNavigator = createSwitchNavigator({
  Loading: {
    screen: LoadingScreen,
    navigationOptions: {
      header: null
    }
  },
  Onboarding: {
    screen: OnboardingScreen,
    navigationOptions: {
      header: null
    }
  },
  Auth: AuthenticationNavigator,
  Main: MainNavigator
});

const AppContainer = createAppContainer(AppNavigator);
const AppWithFontLoadedComponent = ({ isFontLoaded }: any) => {
  return (
    <Loader color={colorLightOrange} isDataLoaded={isFontLoaded}>
      <AppContainer ref={setTopLevelNavigator} />
    </Loader>
  );
};

const AppWithFontLoaded = connect((state: IGlobalState) => ({
  isFontLoaded: state.FontState.isFontLoaded
}))(AppWithFontLoadedComponent);

export default class App extends Component {
  messageListener!: () => any;
  popup: any;

  async componentDidMount(): Promise<any> {
    SplashScreen.hide();

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
            }
          })
        );
      }
    });

    await Font.loadAsync({
      'icons-font': require('./assets/fonts/icon-font/icons-font.ttf'),
      'ss-bold': require('./assets/fonts/samsung-sharp/ss-bold.ttf'),
      'ss-regular': require('./assets/fonts/samsung-sharp/ss-regular.ttf'),
      'ss-medium': require('./assets/fonts/samsung-sharp/ss-medium.ttf')
    });

    getStore().dispatch({
      type: 'FONT_LOADED'
    });

    this.checkPermission();
    this.createNotificationListeners();

    await authenticate();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  notificationListener: any;
  notificationOpenedListener: any;

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body, data } = notification;
        this.showAlert(title, body, data);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        navigate(
          {
            routeName: 'Profile',
            params: { activeTab: notificationOpen.notification.data.activeTab }
          },
          true
        );
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      navigate(
        {
          routeName: 'Profile',
          params: { activeTab: notificationOpen.notification.data.activeTab }
        },
        true
      );
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title: any, body: any, data: any) {
    this.popup.show({
      onPress: function() {
        navigate(
          { routeName: 'Profile', params: { activeTab: data.activeTab } },
          true
        );
      },
      appIconSource: require('./assets/logo2x.png'),
      appTitle: 'Pepup',
      title: title,
      body: body,
      slideOutTime: 10000
    });
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
    let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
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
        <NotificationPopup ref={ref => (this.popup = ref)} />
      </Provider>
    );
  }
}
