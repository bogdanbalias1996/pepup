import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ModalContests } from '../../components/ModalContests/ModalContests';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { ContestsScreenProps } from './types';

import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';

import styles from './Contests.styles';
import { ErrorModal } from '../../components/ErrorState/ErrorState';
import CategoryViewer from '../../components/CategoryViewer';
import { IGlobalState } from '../../coreTypes';

import { getContestsByCategory } from './actions';
import ContestItem from './ContestItem';

export class Component extends React.PureComponent<ContestsScreenProps> {
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: any) => (
      <HeaderRounded
        {...props}
        navigation={navigation}
        title={'Contests'.toUpperCase()}
      />
    )
  });

  private static readonly tabsConfig = [
    {
      title: 'Featured',
      component: ContestItem
    },
    {
      title: 'Active',
      component: ContestItem
    },
    {
      title: 'Past',
      component: ContestItem
    }
  ];

  state = {
    isModalVisible: false,
    activeTabIndex: 0
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleChangeTab = (index: number) => {
    const { getContestsByCategory } = this.props;

    this.setState({ activeTabIndex: index });

    const categoryId = Component.tabsConfig[index].title;

    getContestsByCategory(categoryId);
  };

  render() {
    const { contests } = this.props;
    const { activeTabIndex } = this.state;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <CategoryViewer
            categories={ContestsScreen.tabsConfig}
            data={contests}
            onTabChange={this.handleChangeTab}
            activeTabIndex={activeTabIndex}
          />
        </View>
        <ModalContests />
        <ErrorModal />
      </PepupBackground>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.ContestState.isFetching,
  contests: state.ContestState.contests
});

const mapDispatchToProps = {
  getContestsByCategory
};

export const ContestsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);
