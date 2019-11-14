import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

import { Loader } from '../../components/Loader/Loader';

import { ListProps, ViewerData } from './types';
import styles from './List.styles';
import { colorLightOrange } from '../../variables';

class List extends Component<ListProps> {
  static defaultKeyExtractor = (item: { id: string }) => item.id;

  shouldComponentUpdate(nextProps: ListProps) {
    const oldData = this.extractDataByCategory(
      this.props.data,
      this.props.route.key
    );
    const newData = this.extractDataByCategory(
      nextProps.data,
      nextProps.route.key
    );

    return newData.length !== oldData.length;
  }

  extractDataByCategory(data: ViewerData, category: string): Object[] {
    const categoryCelebs = data[category] || data[category.toLowerCase()] || [];

    return categoryCelebs;
  }

  renderItem = ({ item }: any) => {
    const { route } = this.props;

    return <route.component item={item} />;
  };

  render() {
    const { data, route, flatListStyle, flatListProps = {} } = this.props;
    const dataArr = this.extractDataByCategory(data, route.key);

    return (
      <View style={styles.wrapper}>
        <Loader
          isDataLoaded={Boolean(dataArr.length)}
          color={colorLightOrange}
          size="large">
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            style={flatListStyle || styles.flatList}
            data={dataArr as any}
            renderItem={this.renderItem}
            keyExtractor={
              route.keyExtractor || (List.defaultKeyExtractor as any)
            }
            {...flatListProps}
          />
        </Loader>
      </View>
    );
  }
}

export default List;
