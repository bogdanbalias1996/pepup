import * as React from 'react';
import { View } from 'react-native';

import { ModalEvents } from '../../components/ModalEvents/ModalEvents';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { EventsScreenProps } from '.';
import { EventItems } from './EventItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import styles from './Events.styles';

export class EventsScreen extends React.PureComponent<EventsScreenProps> {
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: any) => (
      <HeaderRounded {...props} title={'Events'.toUpperCase()} />
    )
  });

  private static readonly tabsConfig = [
    {
      title: 'Past',
      component: EventItems
    },
    {
      title: 'Today',
      component: EventItems
    },
    {
      title: 'Featured',
      component: EventItems
    },
    {
      title: 'Upcoming',
      component: EventItems
    },
    {
      title: 'Hot',
      component: EventItems
    }
  ];

  state = {
    isModalVisible: false,
    activeTabIndex: 0
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Tabs
            config={EventsScreen.tabsConfig}
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
        <ModalEvents />
      </PepupBackground>
    );
  }
}
