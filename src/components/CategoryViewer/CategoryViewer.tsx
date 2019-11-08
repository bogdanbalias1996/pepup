import React, { PureComponent, ComponentType } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { createSelector } from 'reselect';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { CategoryViewerProps } from './types';
import { Category } from "../../pages/Pepups";

import defaultTabsStyles from './CategoryViewer.styles';

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
          ? defaultTabsStyles.selectedLabel
          : defaultTabsStyles.itemText
      }>
      {route.title}
    </Text>
  );

  renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={defaultTabsStyles.itemSelectedText}
      style={defaultTabsStyles.tabsBar}
      labelStyle={defaultTabsStyles.itemText}
      scrollEnabled
      tabStyle={defaultTabsStyles.tabBarTabStyle}
      renderLabel={this.renderLabel}
    />
  );

  render() {
    const { config, style, categories, onTabChange, activeTabIndex } = this.props;
    const { sceneMap, routes } = this.generateSceneConfig(categories);

    return (
      <View style={style}>
        <TabView
          navigationState={{
            index: activeTabIndex,
            routes
          }}
          onIndexChange={onTabChange}
          renderScene={sceneMap}
          
          initialLayout={defaultTabsStyles.initialLayout}
          
          renderTabBar={this.renderTabBar}
          lazy
          swipeEnabled
        />
      </View>
    );
  }
}

export default CategoryViewer;