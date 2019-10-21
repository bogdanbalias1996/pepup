import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Dispatch } from 'redux';

import { ModalEvents } from '../../components/ModalEvents/ModalEvents';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { EventsScreenProps } from '.';
import { EventItems } from './EventItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import styles from './Events.styles';
import { IGlobalState } from '../../coreTypes';

const Header = props => (
  <HeaderRounded {...props} title={'Events'.toUpperCase()} />
);

const ConnectedHeader = connect(
  null,
  null
)(Header);

const mapStateToProps = (state: IGlobalState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export class Component extends React.PureComponent<EventsScreenProps> {
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
        component: () => <EventItems />,
        
      },
      {
        title: 'Today',
        component: () => <EventItems />,
      },
      {
        title: 'Featured',
        component: () => <EventItems />,
      },
      {
        title: 'Upcoming',
        component: () => <EventItems />,
      },
      {
        title: 'Deals',
        component: () => <EventItems />,
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
        <ModalEvents />
      </PepupBackground>
    );
  }
}

export const EventsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
