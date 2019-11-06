import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { PepupsScreenProps } from '.';
import { PepupItems } from './PepupItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import styles from './Pepups.styles';
import { IGlobalState } from '../../coreTypes';

import {
  getAllActiveCategories,
  getCelebsByCategory,
  getCeleb,
  setCategory,
  getFeaturedCelebs
} from './actions';
import { Tab } from '../../components/Tabs';
import { Loader } from '../../components/Loader/Loader';
import { colorBlueberry } from '../../variables';


export class Component extends React.PureComponent<PepupsScreenProps> {
  static navigationOptions = () => ({
    header: (props: any) => (
      <HeaderRounded {...props} title={'Pepups'.toUpperCase()} />
    )
  });

  state = {
    isModalVisible: false,
    activeTabIndex: 0
  };

  componentDidMount() {
    const { getAllActiveCategories } = this.props;

    getAllActiveCategories()
    this.fetchCategories('Featured')
  };

  fetchCategories = (categoryId: string) => {
    const {
      getCelebsByCategory,
      setCategory,
      getFeaturedCelebs
    } = this.props;

    setCategory(categoryId);

    categoryId === 'Featured'
      ? getFeaturedCelebs()
      : getCelebsByCategory(categoryId);
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleChangeTab = (index: number) => {
    const { categories } = this.props;

    this.setState({ activeTabIndex: index });

    const categoryId = categories[index].id;
    this.fetchCategories(categoryId);
  }

  render() {
    const { categories, isFetchingCat } = this.props;
    const tabsConfig: Array<Tab> | null = categories.length
      ? categories.map(cat => ({
          title: cat.id,
          component: () => <PepupItems categoryId={cat.id} />
        }))
      : null;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Loader
            size="large"
            color={colorBlueberry}
            isDataLoaded={!isFetchingCat}>
            {tabsConfig && (
              <Tabs
                config={tabsConfig}
                style={{ flex: 1 }}
                changeIndex={this.handleChangeTab}
                activeTabIndex={this.state.activeTabIndex}
                stylesItem={defaultTabsStyles.roundedTabs}
                stylesTabsContainer={{
                  backgroundColor: 'transparent',
                  marginBottom: 10,
                  paddingLeft: 5
                }}
              />
            )}
          </Loader>
        </View>
        <ModalPepup />
        {/* <ErrorModal /> */}
      </PepupBackground>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  categories: state.PepupState.categories,
  isFetchingCat: state.PepupState.isFetchingCat
});
const mapDispatchToProps = {
  getAllActiveCategories,
  getCelebsByCategory,
  getCeleb,
  setCategory,
  getFeaturedCelebs
};

export const PepupsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
