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

const Header = (props: JSX.IntrinsicAttributes & { navigation?: any; title?: any; getLeftComponent?: (() => any) | undefined; getRightComponent?: (() => any) | undefined; }) => (
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
  static navigationOptions = ({ navigation }: any) => ({
    header: (props: JSX.IntrinsicAttributes & Pick<any, string | number | symbol>) => <ConnectedHeader {...props} navigation={navigation} />
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
        component: () => <EventItems categoryId='Past'/>,
      },
      {
        title: 'Today',
        component: () => <EventItems categoryId='Today'/>,
      },
      {
        title: 'Featured',
        component: () => <EventItems categoryId='Featured'/>,
      },
      {
        title: 'Upcoming',
        component: () => <EventItems categoryId='Upcoming'/>,
      },
      {
        title: 'Hot',
        component: () => <EventItems categoryId='Hot'/>,
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
