import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { getEventsByCategory } from './actions';
import { ModalEvents } from '../../components/ModalEvents/ModalEvents';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { EventsScreenProps } from '.';
import { EventItems } from './EventItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import styles from './Events.styles';


class Component extends React.PureComponent<EventsScreenProps> {
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

  componentDidMount() {
    const { getEventsByCategory } = this.props;
    const initialCategory = Component.tabsConfig[0].title;

    getEventsByCategory(initialCategory);
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleChangeTab = (index: number) => {
    const { getEventsByCategory } = this.props;

    this.setState({ activeTabIndex: index })

    const category = Component.tabsConfig[index].title;
    getEventsByCategory(category);
  }

  render() {
    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Tabs
            config={Component.tabsConfig}
            style={styles.tabs}
            stylesItem={defaultTabsStyles.roundedTabs}
            changeIndex={this.handleChangeTab}
            activeTabIndex={this.state.activeTabIndex}
            stylesTabsContainer={styles.stylesTabsContainer}
          />
        </View>
        <ModalEvents />
      </PepupBackground>
    );
  }
}

export const EventsScreen = connect<EventsScreenProps>(null, { getEventsByCategory })(Component);
