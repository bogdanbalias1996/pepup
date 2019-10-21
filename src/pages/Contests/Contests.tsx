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
import { IGlobalState } from '../../coreTypes';

const Header = props => (
  <HeaderRounded {...props} title={'Contests'.toUpperCase()} />
);

const ConnectedHeader = connect(
  null,
  null
)(Header);

const mapStateToProps = (state: IGlobalState) => ({
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export class Component extends React.PureComponent<ContestsScreenProps> {
  static navigationOptions = ({ navigation }) => ({
    header: props => <ConnectedHeader {...props} navigation={navigation} />
  });

  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const tabsConfig = [
      {
        title: 'Past',
        component: () => <ContestItems />
      },
      {
        title: 'Active',
        component: () => <ContestItems />
      },
      {
        title: 'Featured',
        component: () => <ContestItems />
      }
    ];

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
            <Tabs
              config={tabsConfig}
              style={{ flex: 1 }}
              stylesItem={defaultTabsStyles.roundedTabs}
              stylesTabsContainer={{
                backgroundColor: 'transparent',
                marginBottom: 5
              }}
            />
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
