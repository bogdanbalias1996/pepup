import * as React from 'react';
import { View } from 'react-native';

import { ModalContests } from '../../components/ModalContests/ModalContests';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { ContestsScreenProps } from '.';
import { ContestItems } from './ContestItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import styles from './Contests.styles';
import { ErrorModal } from '../../components/ErrorState/ErrorState';

export class ContestsScreen extends React.PureComponent<ContestsScreenProps> {
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: any) => (
      <HeaderRounded
        {...props}
        navigation={navigation}
        title={'Contests'.toUpperCase()}
      />
    )
  });

  state = {
    isModalVisible: false,
    activeTabIndex: 0
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const tabsConfig = [
      {
        title: 'Featured',
        component: () => <ContestItems categoryId="Featured" />
      },
      {
        title: 'Active',
        component: () => <ContestItems categoryId="Active" />
      },
      {
        title: 'Past',
        component: () => <ContestItems categoryId="Past" />
      }
    ];

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Tabs
            config={tabsConfig}
            style={{ flex: 1 }}
            stylesItem={defaultTabsStyles.roundedTabs}
            changeIndex={index => this.setState({ activeTabIndex: index })}
            activeTabIndex={this.state.activeTabIndex}
            stylesTabsContainer={{
              backgroundColor: 'transparent',
              marginBottom: 10,
              paddingLeft: 5
            }}
          />
        </View>
        <ModalContests />
        <ErrorModal />
      </PepupBackground>
    );
  }
}
