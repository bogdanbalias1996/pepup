import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabsProps, Tab } from './';
import { createSelector } from 'reselect';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  colorVioletGrey,
  colorBlack,
  boldFont,
  semiboldFont
} from '../../variables';

export class Tabs extends React.PureComponent<TabsProps> {
  static defaultProps = {
    style: {}
  };

  generateSceneConfig = createSelector(
    (config: Array<Tab>) => {
      const sceneData = config.reduce((acc: { [key: string]: string }, cur, index) => {
        acc[cur.title] = cur.component;
        return acc;
      }, {});
      return SceneMap(sceneData as any);
    },
 
    (config: Array<Tab>) =>
      config.map((item: Tab, index: number) => ({
        key: item.title,
        title: item.title
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
    const { config, style, changeIndex, activeTabIndex } = this.props;
    const { sceneMap, routes } = this.generateSceneConfig(config);

    return (
      <View style={style}>
        <TabView
          lazy
          navigationState={{
            index: activeTabIndex || 0,
            routes
          }}
          renderScene={sceneMap}
          onIndexChange={changeIndex}
          initialLayout={defaultTabsStyles.initialLayout}
          swipeEnabled
          renderTabBar={this.renderTabBar}
        />
      </View>
    );
  }
}

export const defaultTabsStyles = StyleSheet.create({
  roundedTabs: {
    flex: 0,
    borderRadius: 24,
    backgroundColor: 'transparent',
    marginRight: 13,
    paddingTop: 5,
    paddingBottom: 5
  },
  tabsBar: {
    backgroundColor: 'transparent'
  },
  itemSelectedText: {
    display: 'none',
    height: 0
  },
  selectedLabel: {
    paddingTop: 4,
    color: colorBlack,
    fontSize: 16,
    fontFamily: boldFont,
    letterSpacing: 2,
    alignSelf: 'center',
    textAlign: 'left',
    overflow: 'visible'
  },
  itemText: {
    color: colorVioletGrey,
    fontSize: 16,
    fontFamily: semiboldFont,
    alignSelf: 'center',
    textAlign: 'left',
    letterSpacing: 2,
    paddingTop: 4
  },
  initialLayout: {
    width: Dimensions.get('window').width
  },
  tabBarTabStyle: {
    width: 'auto'
  }
});
