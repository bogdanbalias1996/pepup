import * as React from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import { ModalPepup } from "../../components/ModalPepup/ModalPepup";
import { PepupBackground } from "../../components/PepupBackground/PepupBackground";
import { PepupsScreenProps } from ".";
import { PepupItems } from "./PepupItems";
import { HeaderRounded } from "../../components/HeaderRounded/HeaderRounded";
import { Tabs, defaultTabsStyles } from "../../components/Tabs/Tabs";
import styles from "./Pepups.styles";
import { IGlobalState } from "../../coreTypes";
import { Dispatch } from "redux";
import { getAllActiveCategories, getCelebsByCategory } from "./actions";
import { Tab } from "../../components/Tabs";
import { LoadingScreen } from "../Loading/Loading";
const Header = props => (
  <HeaderRounded {...props} title={'Pepups'.toUpperCase()} />
);

const ConnectedHeader = connect(
  null,
  null
)(Header);

const mapStateToProps = (state: IGlobalState) => ({
  categories: state.PepupState.categories,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllActiveCategories: () => dispatch(getAllActiveCategories() as any),
  getCelebsByCategory: ( categoryid: string) => dispatch(getCelebsByCategory(categoryid) as any)
});

export class Component extends React.PureComponent<PepupsScreenProps> {
  static navigationOptions = ({ navigation }) => ({
    header: props => <ConnectedHeader {...props} navigation={navigation} />
  });

  state = {
    isModalVisible: false
  };

  componentDidMount = () => {
    const { getAllActiveCategories } = this.props;
    getAllActiveCategories();
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    const { categories } = this.props;
    const tabsConfig: Array<Tab> = categories.length ? categories.map(cat => ({
      title: cat.id,
      component: () => <PepupItems categoryId={cat.id} />
    })) : null;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          {categories.length ? (
            <Tabs
              config={tabsConfig}
              style={{ flex: 1 }}
              stylesItem={defaultTabsStyles.roundedTabs}
              stylesTabsContainer={{
                backgroundColor: "transparent",
                marginBottom: 10
              }}
            />
          ) : (
            <LoadingScreen />
          )}
        </View>
        <ModalPepup />
      </PepupBackground>
    );
  }
}

export const PepupsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
