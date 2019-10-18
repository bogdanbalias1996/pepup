import * as React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Image, View} from 'react-native';
import {
  colorBlack,
  colorTextGray,
  colorShadow,
  defaultFont,
} from '../variables';

import {PepupsScreen} from '../pages/Pepups/Pepups';
import {EventsScreen} from '../pages/Events/Events';
import {ContestsScreen} from '../pages/Contests/Contests';
import {ProfileScreen} from '../pages/Profile/Profile';
import {SettingsScreen} from '../pages/Settings/Settings';
import {StoreScreen} from '../pages/Store/Store';
import {EditProfileScreen} from '../pages/EditProfile/EditProfile';
import { EditProfileCelebScreen } from '../pages/EditProfile/EditProfileCeleb';

// Icons for BottomTabNavigator
const Pepups = require('../../assets/pepups.png');
const PepupsActive = require('../../assets/pepupsActive.png');
const Events = require('../../assets/events.png');
const EventsActive = require('../../assets/eventsActive.png');
const Contests = require('../../assets/contests.png');
const ContestsActive = require('../../assets/contestsActive.png');
const Store = require('../../assets/store.png');
const StoreActive = require('../../assets/storeActive.png');
const Profile = require('../../assets/profile.png');
const ProfileActive = require('../../assets/profileActive.png');

const formatScreenProps = (ScreenName: any, ScreenComponent: any) => {
  return {
    screen: createStackNavigator({
      [ScreenName]: ScreenComponent,
    }),
    navigationOptions: ({navigation}: any) => ({
      headerTransparent: true,
    }),
  };
};

export const TabsNavigator = createBottomTabNavigator(
  {
    Pepups: formatScreenProps('Pepups', PepupsScreen),
    Events: formatScreenProps('Events', EventsScreen),
    Contests: formatScreenProps('Contests', ContestsScreen),
    Store: formatScreenProps('Store', StoreScreen),
    Profile: formatScreenProps('Profile', ProfileScreen),
  },
  {
    tabBarOptions: {
      style: {
        height: 62,
        borderTopColor: 'transparent',
        shadowColor: colorShadow,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
      },
      activeTintColor: colorBlack,
      inactiveTintColor: colorTextGray,
      labelStyle: {
        marginTop: 3,
        fontSize: 13,
        letterSpacing: 0.5,
        fontFamily: defaultFont,
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 7,
      },
    },
    initialRouteName: 'Pepups',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;

        switch (routeName) {
          case 'Pepups':
            iconName = focused ? PepupsActive : Pepups;
            break;
          case 'Events':
            iconName = focused ? EventsActive : Events;
            break;
          case 'Contests':
            iconName = focused ? ContestsActive : Contests;
            break;
          case 'Store':
            iconName = focused ? StoreActive : Store;
            break;
          case 'Profile':
            iconName = focused ? ProfileActive : Profile;
            break;
        }
        return (
          <View style={{position: 'relative'}}>
            <Image
              source={iconName}
              style={{width: 24, height: 24}}
              resizeMode="contain"
            />
          </View>
        );
      },
    }),
  },
);

export const MainNavigator = createStackNavigator({
  Tabs: {
    screen: TabsNavigator,
    navigationOptions: {
      header: null,
    },
  },
  Settings: SettingsScreen,
  EditProfile: EditProfileScreen,
  EditProfileCeleb: EditProfileCelebScreen
});
