import * as React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

import {ModalContests} from '../../components/ModalContests/ModalContests';
import {PepupBackground} from '../../components/PepupBackground/PepupBackground';
import {ContestsScreenProps} from '.';
import {ContestItems} from './ContestItems';
import {HeaderRounded} from '../../components/HeaderRounded/HeaderRounded';
import {Tabs, defaultTabsStyles} from '../../components/Tabs/Tabs';
import styles from './Contests.styles';
import {Dispatch} from 'redux';
import {IGlobalState} from '../../coreTypes';
import {ErrorModal} from '../../components/ErrorState/ErrorState';

const mapStateToProps = (state: IGlobalState) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export class Component extends React.PureComponent<ContestsScreenProps> {
  static navigationOptions = ({navigation}: any) => ({
    header: (props: any) => <HeaderRounded {...props} navigation={navigation} title={'Contests'.toUpperCase()} />
  });

  state = {
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    const tabsConfig = [
      {
        title: 'Past',
        component: () => <ContestItems categoryId='Past'/>,
      },
      {
        title: 'Active',
        component: () => <ContestItems categoryId='Active'/>,
      },
      {
        title: 'Featured',
        component: () => <ContestItems categoryId='Featured'/>,
      },
    ];

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Tabs
            config={tabsConfig}
            style={{flex: 1}}
            stylesItem={defaultTabsStyles.roundedTabs}
            stylesTabsContainer={{
              backgroundColor: 'transparent',
              marginBottom: 5,
            }}
          />
        </View>
        <ModalContests />
        <ErrorModal />
      </PepupBackground>
    );
  }
}

export const ContestsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
