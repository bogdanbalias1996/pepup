import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {Dispatch} from 'redux';

import {ModalStore} from '../../components/ModalStore/ModalStore';
import {PepupBackground} from '../../components/PepupBackground/PepupBackground';
import {StoreScreenProps} from '.';
import {StoreItems} from './StoreItems';
import {HeaderRounded} from '../../components/HeaderRounded/HeaderRounded';
import {Tabs, defaultTabsStyles} from '../../components/Tabs/Tabs';
import styles from './Store.styles';
import {IGlobalState} from '../../coreTypes';
import {getProductsCategories} from './actions';
import {Tab} from '../../components/Tabs';
import {Loader} from '../../components/Loader/Loader';
import {colorLightOrange} from '../../variables';

const Header = (
  props: JSX.IntrinsicAttributes & {
    navigation?: any;
    title?: any;
    getLeftComponent?: () => any;
    getRightComponent?: () => any;
  },
) => <HeaderRounded {...props} title={'Store'.toUpperCase()} />;

const mapStateToProps = (state: IGlobalState) => ({
  prodCategories: state.StoreState.prodCategories,
  isFetchingCat: state.StoreState.isFetchingCat,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProductsCategories: () => dispatch(getProductsCategories() as any),
});

const ConnectedHeader = connect(
  mapStateToProps,
  null,
)(Header);

export class Component extends React.PureComponent<StoreScreenProps> {
  static navigationOptions = ({navigation}: any) => ({
    header: (
      props: JSX.IntrinsicAttributes &
        Pick<
          JSX.IntrinsicAttributes & {
            navigation?: any;
            title?: any;
            getLeftComponent?: () => any;
            getRightComponent?: () => any;
          },
          | 'title'
          | 'key'
          | 'navigation'
          | 'getLeftComponent'
          | 'getRightComponent'
        >,
    ) => <ConnectedHeader {...props} navigation={navigation} />,
  });

  state = {
    isModalVisible: false,
  };

  componentDidMount = () => {
    const {getProductsCategories} = this.props;
    getProductsCategories();
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    const {prodCategories, isFetchingCat} = this.props;
    const tabsConfig: Array<Tab> | null = prodCategories.length
      ? prodCategories.map(cat => ({
          title: cat.name,
          component: () => <StoreItems prodCatType={cat.type} />,
        }))
      : null;

    return (
      <PepupBackground>
        <View style={styles.wrapContent}>
          <Loader
            size="large"
            color={colorLightOrange}
            isDataLoaded={!isFetchingCat}>
            {tabsConfig && (
              <Tabs
                config={tabsConfig}
                style={{flex: 1, marginHorizontal: 14}}
                stylesItem={defaultTabsStyles.roundedTabs}
                stylesTabsContainer={{
                  backgroundColor: 'transparent',
                  marginBottom: 10,
                }}
              />
            )}
          </Loader>
        </View>
        <ModalStore />
      </PepupBackground>
    );
  }
}

export const StoreScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
