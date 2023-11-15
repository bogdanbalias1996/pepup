import * as React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Image, View } from 'react-native';
import {
  colorBlack,
  colorShadow,
  semiboldFont,
  colorTextMainTabs
} from '../variables';

import { PepupsScreen } from '../pages/Pepups/Pepups';
import { EventsScreen } from '../pages/Events/Events';
import { ContestsScreen } from '../pages/Contests/Contests';
import { ProfileScreen } from '../pages/Profile/Profile';
import { SettingsScreen } from '../pages/Settings/Settings';
// import { StoreScreen } from '../pages/Store/Store';
import { EditProfileScreen } from '../pages/EditProfile/EditProfile';
import { EditProfileCelebScreen } from '../pages/EditProfile/EditProfileCeleb';

// Icons for BottomTabNavigator
const Pepups = require('../../assets/pepups.png');
const PepupsActive = require('../../assets/pepupsActive.png');
const Events = require('../../assets/events.png');
const EventsActive = require('../../assets/eventsActive.png');
const Contests = require('../../assets/contests.png');
const ContestsActive = require('../../assets/contestsActive.png');
// const Store = require('../../assets/store.png');
// const StoreActive = require('../../assets/storeActive.png');
const Profile = require('../../assets/profile.png');
const ProfileActive = require('../../assets/profileActive.png');

const getActiveTabIconName = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'Pepups':
      return focused ? PepupsActive : Pepups;
    case 'Events':
      return focused ? EventsActive : Events;
    case 'Contests':
      return focused ? ContestsActive : Contests;
    // case 'Store':
    //   return focused ? StoreActive : Store;
    case 'Profile':
      return focused ? ProfileActive : Profile;
    default:
      console.log(`Unsupported tab name: '${routeName}'`);
  }
};

const formatScreenProps = (ScreenName: any, ScreenComponent: any) => {
  return {
    screen: createStackNavigator(
      { [ScreenName]: ScreenComponent },
      {
        headerMode: 'screen'
      }
    ),
    navigationOptions: {
      tabBarLabel: `${ScreenName}`.toUpperCase()
    }
  };
};

export const TabsNavigator = createBottomTabNavigator(
  {
    Pepups: formatScreenProps('Pepups', PepupsScreen),
    Events: formatScreenProps('Events', EventsScreen),
    Contests: formatScreenProps('Contests', ContestsScreen),
    // Store: formatScreenProps('Store', StoreScreen),
    Profile: formatScreenProps('Profile', ProfileScreen)
  },
  {
    initialRouteName: 'Pepups',
    tabBarOptions: {
      style: {
        height: 62,
        borderTopColor: 'transparent',
        shadowColor: colorShadow,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7
      },
      activeTintColor: colorBlack,
      inactiveTintColor: colorTextMainTabs,
      labelStyle: {
        marginTop: 3,
        fontSize: 11,
        letterSpacing: 1,
        fontFamily: semiboldFont
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 7
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;

        return (
          <View style={{ position: 'relative' }}>
            <Image
              source={getActiveTabIconName(routeName, focused)}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </View>
        );
      }
    })
  }
);

export const MainNavigator = createStackNavigator(
  {
    Tabs: TabsNavigator,
    Settings: SettingsScreen,
    EditProfile: EditProfileScreen,
    EditProfileCeleb: EditProfileCelebScreen
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null
    }
  }
);
