import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { ModalPepup } from '../../components/ModalPepup/ModalPepup';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';
import { PepupsScreenProps, Category } from '.';
import { PepupItems } from './PepupItems';
import { HeaderRounded } from '../../components/HeaderRounded/HeaderRounded';
import { Tabs, defaultTabsStyles } from '../../components/Tabs/Tabs';
import styles from './Pepups.styles';
import { IGlobalState } from '../../coreTypes';
import memoize from 'memoize-one';

import {
  getAllActiveCategories,
  getCelebsByCategory,
  getCeleb,
  setCategory,
  getFeaturedCelebs
} from './actions';
import { Tab } from '../../components/Tabs';
import { Loader } from '../../components/Loader/Loader';
import CategoryViewer from '../../components/CategoryViewer';
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

  createTabsConfig = memoize((categories: Category[]): Array<Tab> | null => {
    const tabsConfig: Array<Tab> | null = categories.length
      ? categories.map(cat => ({
          title: cat.id,
          component: PepupItems
        }))
      : null;

    return tabsConfig;
  })

  render() {
    const { categories, isFetchingCat, celebs } = this.props;
    const { activeTabIndex } = this.state;

    const isCategoriesLoaded = Boolean(categories && categories.length);

    const tabsConfig = this.createTabsConfig(categories);

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Loader
            size="large"
            color={colorBlueberry}
            isDataLoaded={!isFetchingCat}
          >
            {isCategoriesLoaded && (
              <CategoryViewer
                categories={categories}
                data={celebs}
                activeTabIndex={activeTabIndex}
                onTabChange={this.handleChangeTab}
                // stylesItem={defaultTabsStyles.roundedTabs}
                // stylesTabsContainer={styles.stylesTabsContainer}
              />
            )}

            {/* {tabsConfig && (
              <Tabs
                config={tabsConfig}
                style={styles.tabsComponent}
                changeIndex={this.handleChangeTab}
                activeTabIndex={this.state.activeTabIndex}
                stylesItem={defaultTabsStyles.roundedTabs}
                stylesTabsContainer={styles.stylesTabsContainer}
              />
            )} */}
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
  isFetchingCat: state.PepupState.isFetchingCat,
  celebs: state.PepupState.celebs
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
