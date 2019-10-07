import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { ModalContests } from '../../components/ModalContests/ModalContests';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { ContestsScreenProps } from '.';
import { ContestItems } from './ContestItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import styles from './Contests.styles';
import { Dispatch } from 'redux';
import { getAllContests } from './actions';
import { IGlobalState } from '../../coreTypes';
import { LoadingScreen } from '../Loading/Loading';
import { Loader } from '../../components/Loader/Loader';
import { colorBlueberry } from '../../variables';

const Header = props => (
  <HeaderRounded {...props} title={'Contests'.toUpperCase()} />
);

const ConnectedHeader = connect(
  null,
  null
)(Header);

const mapStateToProps = (state: IGlobalState) => ({
  contests: state.ContestState.contests,
  isFetching: state.ContestState.isFetching
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllContests: () => dispatch(getAllContests() as any)
});

export class Component extends React.PureComponent<ContestsScreenProps> {
  static navigationOptions = ({ navigation }) => ({
    header: props => <ConnectedHeader {...props} navigation={navigation} />
  });

  state = {
    isModalVisible: false
  };

  componentDidMount = () => {
    const { getAllContests } = this.props;
    getAllContests();
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const { contests, getAllContests, isFetching } = this.props;
    const tabsConfig = [
      {
        title: 'Past',
        component: () => <ContestItems data={contests} />,
        onPress: () => getAllContests()
      },
      {
        title: 'Active',
        component: () => <ContestItems data={contests} />,
        onPress: () => getAllContests()
      },
      {
        title: 'Featured',
        component: () => <ContestItems data={contests} />,
        onPress: () => getAllContests()
      }
    ];

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Loader
            isDataLoaded={!isFetching}
            color={colorBlueberry}
            size="large"
          >
            <Tabs
              config={tabsConfig}
              style={{ flex: 1 }}
              stylesItem={defaultTabsStyles.roundedTabs}
              stylesTabsContainer={{
                backgroundColor: 'transparent',
                marginBottom: 5
              }}
            />
          </Loader>
        </View>
        <ModalContests />
      </PepupBackground>
    );
  }
}

export const ContestsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
