import React, { PureComponent, ComponentType } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { createSelector } from 'reselect';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { CategoryViewerProps } from './types';
import { Category } from "../../pages/Pepups";

import styles from './CategoryViewer.styles';

class CategoryViewer extends PureComponent<CategoryViewerProps> {
  static defaultProps = {
    style: {}
  };

  generateSceneConfig = createSelector(
    (categories: Category[]) => {
      const sceneData = categories.reduce((acc: { [key: string]: ComponentType }, cur, index) => {
        acc[cur.id] = () => <View><Text>test</Text></View>;
        return acc;
      }, {});

      return SceneMap(sceneData as any);
    },
 
    (categories: Category[]) =>
      categories.map((item: Category) => ({
        key: item.id,
        title: item.id
      })),

    (sceneMap, routes) => ({ sceneMap, routes })
  )

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
      labelStyle={styles.itemText}
      tabStyle={styles.tabBarTabStyle}
      renderLabel={this.renderLabel}
      scrollEnabled
    />
  );

  render() {
    const { config, categories, onTabChange, activeTabIndex } = this.props;
    const { sceneMap, routes } = this.generateSceneConfig(categories);

    return (
      <View style={styles.wrapper}>
        <TabView
          navigationState={{
            index: activeTabIndex,
            routes
          }}
          onIndexChange={onTabChange}
          renderScene={sceneMap}
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