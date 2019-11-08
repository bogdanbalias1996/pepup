import React, { PureComponent, ComponentType } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { createSelector } from 'reselect';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { CategoryViewerProps } from './types';
import { Category } from "../../pages/Pepups";

import styles from './CategoryViewer.styles';

import List from './List'; 

class CategoryViewer extends PureComponent<CategoryViewerProps> {
  static defaultProps = {
    style: {}
  };

  generateRoutes = (categories: Category[]) =>
    categories.map((item: Category) => ({
      key: item.id,
      title: item.id
    }))

  renderScene = ({ route }: { route: { key: string } }) => (
    <List route={route} data={this.props.data} />
  );

  renderLabel = ({ route, focused }: { route: { title: string }; focused: boolean }) => (
    <Text
      style={
        focused
          ? styles.selectedLabel
          : styles.itemText
      }>
      {route.title}
    </Text>
  );

  renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.itemSelectedText}
      style={styles.tabsBar}
      tabStyle={styles.tabBarTabStyle}
      labelStyle={styles.itemText}
      renderLabel={this.renderLabel}
      scrollEnabled
    />
  );

  render() {
    const { categories, onTabChange, activeTabIndex } = this.props;
  
    const routes = this.generateRoutes(categories);

    return (
      <View style={styles.wrapper}>
        <TabView
          navigationState={{
            index: activeTabIndex,
            routes
          }}
          onIndexChange={onTabChange}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          initialLayout={styles.initialLayout}
          lazy
          swipeEnabled
        />
      </View>
    );
  }
}

export default CategoryViewer;