import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { createSelector } from 'reselect';
import memoize from 'memoize-one';

import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { ModalRecordVideo } from '../../components/ModalRecordVideo/ModalRecordVideo';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import { MyRequests } from './MyRequests';
import { FanRequests } from './FanRequests';
import { Loader } from '../../components/Loader/Loader';
import { ModalPepupNotification } from '../../components/ModalPepupNotification/ModalPepupNotification';
import { ModalPostReview } from '../../components/ModalReviewForm/ModalPostReview';
import { Notifications } from './Notifications';
import EditProfileButton from './EditProfileButton';
import UserBlock from './UserBlock';
import ProfileHeader from './ProfileHeader';

import { isUserCelebritySelector } from '../../selectors';

import { getProfile, getUserPepups, getCelebPepups } from './actions';

import { IGlobalState } from '../../coreTypes';
import {
  ProfileScreenProps,
  ProfileScreenState,
  ProfileTabType,
  ProfileTabConfig
} from './types';

import styles from './Profile.styles';
import CategoryViewer from '../../components/CategoryViewer';
import { ViewerCategory } from '../../components/CategoryViewer/types';

export class Component extends React.Component<
  ProfileScreenProps,
  ProfileScreenState
> {
  static navigationOptions = () => ({
    header: (navigationProps: any) => <ProfileHeader {...navigationProps} />
  });

  static getDerivedStateFromProps(
    nextProps: ProfileScreenProps,
    prevState: ProfileScreenState
  ) {
    const { profileData, navigation, isCelebrity } = nextProps;
    const { params } = nextProps.navigation.state;

    if (params && profileData) {
      if (
        isCelebrity &&
        params.activeTab &&
        celebTabs[params.activeTab] !== prevState.activeTabIndex
      ) {
        const activeTabIndex = celebTabs[params.activeTab];
        navigation.setParams({ activeTab: null });
        return { activeTabIndex };
      } else if (
        !isCelebrity &&
        params.activeTab &&
        userTabs[params.activeTab] !== prevState.activeTabIndex
      ) {
        const activeTabIndex = userTabs[params.activeTab];
        navigation.setParams({ activeTab: null });
        return { activeTabIndex };
      }
    }

    return null;
  }

  state = {
    activeTabIndex: 0
  };

  componentDidMount() {
    const { handle, getProfile } = this.props;

    if (handle) getProfile(handle);
  }

  getTabsConfig = memoize((isCelebrity: boolean): ProfileTabConfig[] => {
    const tabsConfig: ProfileTabConfig[] = [
      {
        title: 'My Requests',
        component: () => <Text>1</Text>
      },
      {
        title: 'Notifications',
        component: () => <Text>1</Text>
      }
    ];

    const tabsConfigCeleb: ProfileTabConfig[] = [
      {
        title: 'Fan Requests',
        component: () => <Text>1</Text>
      },
      ...tabsConfig
    ];

    return isCelebrity ? tabsConfigCeleb : tabsConfig;
  });

  handleChangeTab = (index: number) => {
    const { isCelebrity } = this.props;

    const tabs = this.getTabsConfig(isCelebrity);
    const tabName = tabs[index].title;

    const sw: { [key in ProfileTabType]: () => void } = {
      'My Requests': () => {
        const { getUserPepups, userId } = this.props;

        userId && getUserPepups(userId);
      },
      'Fan Requests': () => {
        const { getCelebPepups, userId } = this.props;

        userId && getCelebPepups(userId);
      },
      Notifications: () => {
        console.log('fetching notifications');
      }
    };

    sw[tabName] && sw[tabName]();
    this.setState({ activeTabIndex: index });
  };

  render() {
    const { profileData, isCelebrity, data } = this.props;
    const { activeTabIndex } = this.state;

    if (!profileData) {
      return null;
    }

    const tabsConfig = this.getTabsConfig(isCelebrity);

    return (
      <PepupBackground>
        <UserBlock />
        <EditProfileButton />

        <View style={styles.wrapContent}>
          <Loader isDataLoaded={!!profileData}>
            {/* <Tabs
              config={tabsConfig}
              changeIndex={(index: number) =>
                this.setState({ activeTabIndex: index })
              }
              style={{ flex: 1 }}
              stylesItem={defaultTabsStyles.roundedTabs}
              activeTabIndex={this.state.activeTabIndex}
              stylesTabsContainer={{
                backgroundColor: 'transparent',
                marginBottom: 10
              }}
            /> */}
            <CategoryViewer
              categories={tabsConfig as ViewerCategory[]}
              data={data}
              activeTabIndex={activeTabIndex}
              onTabChange={this.handleChangeTab}
            />
          </Loader>
        </View>
        <ModalRecordVideo />
        <ModalPepup />
        <ModalPostReview />
        <ModalPepupNotification />
      </PepupBackground>
    );
  }
}

const celebTabs: { [key: string]: number } = {
  funRequests: 0,
  myRequests: 1,
  notifications: 2
};

const userTabs: { [key: string]: number } = {
  myRequests: 0,
  notifications: 1
};

const mapStateToProps = createSelector(
  isUserCelebritySelector,
  (
    state: IGlobalState
  ): {
    [key in ProfileTabType]: Array<any>;
  } => ({
    'My Requests': state.ProfileState.userPepups,
    'Fan Requests': state.ProfileState.celebPepups,
    Notifications: require('./mocks').notifications
  }),
  (state: IGlobalState) => ({
    userId: state.LoginState.userId,
    handle: state.LoginState.handle,
    profileData: state.ProfileState.profileData
  }),
  (isCelebrity: boolean, data, otherProps) => {
    return {
      isCelebrity,
      data,
      ...otherProps
    };
  }
);

const mapDispatchToProps = {
  getProfile,
  getUserPepups,
  getCelebPepups
};

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);
