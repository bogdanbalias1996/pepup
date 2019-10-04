import * as React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Dispatch } from "redux";

import { ModalEvents } from "../../components/ModalEvents/ModalEvents";
import { PepupBackground } from "../../components/PepupBackground/PepupBackground";
import { EventsScreenProps } from ".";
import { EventItems } from "./EventItems";
import { HeaderRounded } from "../../components/HeaderRounded/HeaderRounded";
import { Tabs, defaultTabsStyles } from "../../components/Tabs/Tabs";
import styles from "./Events.styles";
import { getAllEvents } from "./actions";
import { IGlobalState } from "../../coreTypes";

const Header = props => (
  <HeaderRounded {...props} title={"Events".toUpperCase()} />
);

const ConnectedHeader = connect(
  null,
  null
)(Header);

const mapStateToProps = (state: IGlobalState) => ({
  events: state.EventState.events
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllEvents: () => dispatch(getAllEvents() as any)
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

  componentDidMount = () => {
    const { getAllEvents } = this.props;
    getAllEvents();
  };

  render() {
    const { events, getAllEvents } = this.props;
    const tabsConfig = [
      {
        title: "Past",
        component: () => <EventItems data={events} />,
        onPress: () => getAllEvents()
      },
      {
        title: "Today",
        component: () => <EventItems data={events} />,
        onPress: () => getAllEvents()
      },
      {
        title: "Featured",
        component: () => <EventItems data={events} />,
        onPress: () => getAllEvents()
      },
      {
        title: "Upcoming",
        component: () => <EventItems data={events} />,
        onPress: () => getAllEvents()
      },
      {
        title: "Deals",
        component: () => <EventItems data={events} />,
        onPress: () => getAllEvents()
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
              backgroundColor: "transparent",
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
