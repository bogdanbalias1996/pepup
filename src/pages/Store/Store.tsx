import * as React from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import { ModalStore } from "../../components/ModalStore/ModalStore";
import { PepupBackground } from "../../components/PepupBackground/PepupBackground";
import { StoreScreenProps } from ".";
import { StoreItems } from "./StoreItems";
import { HeaderRounded } from "../../components/HeaderRounded/HeaderRounded";
import { Tabs, defaultTabsStyles } from "../../components/Tabs/Tabs";
import styles from "./Store.styles";

const Header = props => (
  <HeaderRounded {...props} title={"Store".toUpperCase()} />
);

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

const ConnectedHeader = connect(
  mapStateToProps,
  null
)(Header);

export class Component extends React.PureComponent<StoreScreenProps> {
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
    const dataStore = [
      {
        id: "1",
        name: "Sindhu Signed Olympics 2016 pic",
        avatar: require("../../../assets/mock_avatar.jpg"),
        salePrize: "1529",
        prize: "1799",
        sale: "15"
      },
      {
        id: "2",
        name: "Viktor Axelsen",
        avatar: require("../../../assets/mock_avatar.jpg"),
        salePrize: "1529",
        prize: "1799",
        sale: "15"
      },
      {
        id: "3",
        name: "Viktor Axelsen",
        avatar: require("../../../assets/mock_avatar.jpg"),
        prize: "1799"
      },
      {
        id: "4",
        name: "Viktor Axelsen",
        avatar: require("../../../assets/mock_avatar.jpg"),
        salePrize: "1529",
        prize: "1799",
        sale: "15"
      },
      {
        id: "5",
        name: "Viktor Axelsen",
        avatar: require("../../../assets/mock_avatar.jpg"),
        salePrize: "1529",
        prize: "1799",
        sale: "15"
      },
      {
        id: "6",
        name: "Viktor Axelsen",
        avatar: require("../../../assets/mock_avatar.jpg"),
        salePrize: "1529",
        prize: "1799",
        sale: "15"
      }
    ];
    const tabsConfig = [
      {
        title: "Featured",
        component: () => <StoreItems data={dataStore} />
      },
      {
        title: "Badminton",
        component: () => <StoreItems data={dataStore} />
      },
      {
        title: "Football",
        component: () => <StoreItems data={dataStore} />
      },
      {
        title: "Khaddi",
        component: () => <StoreItems data={dataStore} />
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
              marginBottom: 10
            }}
          />
        </View>
        <ModalStore />
      </PepupBackground>
    );
  }
}

export const StoreScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
