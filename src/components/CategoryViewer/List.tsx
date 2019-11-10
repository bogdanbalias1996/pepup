import React, { Component } from 'react';
import {
  FlatList,
  View
} from 'react-native';

import { colorBlueberry } from '../../variables';

import { Loader } from '../../components/Loader/Loader';

import { ListProps, ViewerData } from './types';
import styles from './List.styles';

class List extends React.Component<ListProps> {
  keyExstractor = (item: { id: string }) => item.id;

  shouldComponentUpdate(nextProps: ListProps) {
    const oldData = this.extractDataByCategory(this.props.data, this.props.route.key);
    const newData = this.extractDataByCategory(nextProps.data, nextProps.route.key);

    return newData.length !== oldData.length;
  }

  extractDataByCategory(data: ViewerData , category: string): Object[]  {
    const categoryName = category.toLowerCase();
    const categoryCelebs = data[categoryName] || [];

    return categoryCelebs;
  }

  renderItem = ({ item }: any) => {
    const { route } = this.props

    return <route.component item={item} />
  };

  render() {
    const { data, route } = this.props;
    const dataArr = this.extractDataByCategory(data, route.key);

    return (
      <View style={styles.celebsWrapper}>
        <Loader
          isDataLoaded={Boolean(dataArr.length)}
          color={colorBlueberry}
          size="large">
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            horizontal={false}
            columnWrapperStyle={styles.row}
            data={dataArr as any}
            renderItem={this.renderItem}
            keyExtractor={this.keyExstractor}
          />
        </Loader>
      </View>
    );
  }
}

export default List;
