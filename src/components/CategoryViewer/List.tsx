import * as React from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';

// import {
//   openPepupModal,
//   getCelebsByCategory,
//   getCeleb,
//   setCategory,
//   getFeaturedCelebs
// } from '../../pages/Pepups/actions';

import { colorBlueberry } from '../../variables';

import { Loader } from '../../components/Loader/Loader';
import { Card } from '../../components/Card/Card';
import { CardGradient } from '../../components/CardGradient/CardGradient';

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
    // const { openPepupModal, getCeleb } = this.props;
    // const getModal = () => {
    //   openPepupModal();
    //   getCeleb(item.userInfo.id);
    // };
    
    return (
      <View style={{ flex: 0.5 }}>
        <Card style={styles.card}>
          <TouchableOpacity
            // onPress={getModal}
            style={styles.avatarWrapper}
            activeOpacity={1}>
            <FastImage
              style={styles.avatar}
              source={{
                uri: item.userInfo.icon,
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <CardGradient>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                {item.userInfo.name}
              </Text>
              <Text
                style={styles.status}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.dataInfo.intro}
              </Text>
            </CardGradient>
          </TouchableOpacity>
        </Card>
      </View>
    );
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
