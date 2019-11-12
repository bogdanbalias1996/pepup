import * as React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { getEventsByCategory } from './actions';
import { ModalEvents } from '../../components/ModalEvents/ModalEvents';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { EventsScreenProps } from './types';
import { EventItems } from './EventItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import CategoryViewer from '../../components/CategoryViewer';
import styles from './Events.styles';
import { IGlobalState } from '../../coreTypes';

import EventCard from './EventCard';

class Component extends React.PureComponent<EventsScreenProps> {
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: any) => (
      <HeaderRounded {...props} title={'Events'.toUpperCase()} />
    )
  });

  private static readonly tabsConfig = [
    {
      title: 'Past',
      component: EventCard
    },
    {
      title: 'Today',
      component: EventCard
    },
    {
      title: 'Featured',
      component: EventCard
    },
    {
      title: 'Upcoming',
      component: EventCard
    },
    {
      title: 'Hot',
      component: EventCard
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
    const { getEventsByCategory } = this.props;

    this.setState({ activeTabIndex: index });

    const category = Component.tabsConfig[index].title;
    getEventsByCategory(category);
  };

  render() {
    const { events } = this.props;
    const { activeTabIndex } = this.state;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <CategoryViewer
            categories={Component.tabsConfig}
            data={events}
            activeTabIndex={activeTabIndex}
            onTabChange={this.handleChangeTab}
          />
        </View>
        <ModalEvents />
      </PepupBackground>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  events: state.EventState.events
});

const mapDispatchToProps = {
  getEventsByCategory
};

export const EventsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component as any);
