import * as React from "react";
import { connect } from "react-redux";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { PepupBackground } from "../../components/PepupBackground/PepupBackground";
import { Icon } from "../../components/Icon/Icon";
import { ProfileScreenProps } from ".";
import { NotificationItems } from "./NotificationItems";
import { HeaderRounded } from "../../components/HeaderRounded/HeaderRounded";
import { Tabs, defaultTabsStyles } from "../../components/Tabs/Tabs";
import styles from "./Profile.styles";
import { navigate } from "../../navigationService";
import { Dispatch } from "redux";
import { getProfile } from "./actions";
import { IGlobalState } from "../../coreTypes";

const Header = props => (
  <HeaderRounded
    {...props}
    title={"Profile".toUpperCase()}
    getRightComponent={() => {
      return (
        <TouchableOpacity onPress={() => navigate({ routeName: "Settings" })}>
          <Icon name="nut-icon" />
        </TouchableOpacity>
      );
    }}
  />
);

const mapStateToProps = (state: IGlobalState) => ({
  userId: state.LoginState.userId,
  profileData: state.ProfileState.profileData
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: (id: string) => dispatch(getProfile(id) as any)
});

const ConnectedHeader = connect(
  mapStateToProps,
  null
)(Header);

export class Component extends React.PureComponent<ProfileScreenProps> {
  static navigationOptions = ({ navigation }) => ({
    header: props => <ConnectedHeader {...props} navigation={navigation} />
  });

  state = {
    isModalVisible: false
  };

  dataNotifications = [
    {
      id: "1",
      date: "Today",
      title: "New Event Started",
      text:
        "Awadhe Warriors - Fan Meet n Greet started today. Get ready to be one of the participants!"
    },
    {
      id: "2",
      date: "Today",
      title: "New Event Started",
      text:
        "Awadhe Warriors - Fan Meet n Greet started today. Get ready to be one of the participants!"
    },
    {
      id: "3",
      date: "Today",
      title: "New Event Started",
      text:
        "Awadhe Warriors - Fan Meet n Greet started today. Get ready to be one of the participants!"
    }
  ];
  tabsConfig = [
    {
      title: "Notifications",
      component: () => <NotificationItems data={this.dataNotifications} />
    },
    {
      title: "Purchases",
      component: () => <NotificationItems data={this.dataNotifications} />
    }
  ];

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount = () => {
    const { userId } = this.props;
    userId && this.props.getProfile(userId);
  };

  render() {
    const { profileData } = this.props;

    return (
      <PepupBackground>
        <Image
          style={styles.avatar}
          source={require("../../../assets/mock_avatar.jpg")}
          resizeMode="cover"
        />
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{profileData.name || ""}</Text>
          <TouchableOpacity
            onPress={() => navigate({ routeName: "EditProfile" })}
          >
            <Icon name="edit" />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapContent}>
          <Tabs
            config={this.tabsConfig}
            style={{ flex: 1 }}
            stylesItem={defaultTabsStyles.roundedTabs}
            stylesTabsContainer={{
              backgroundColor: "transparent",
              marginBottom: 10
            }}
          />
        </View>
      </PepupBackground>
    );
  }
}

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
