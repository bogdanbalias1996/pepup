import * as React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabsProps, Tab } from './';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  colorVioletGrey,
  colorBlack,
  boldFont,
  semiboldFont
} from '../../variables';

export class Tabs extends React.PureComponent<TabsProps> {
  state = {
    index: this.props.activeTabIndex ? this.props.activeTabIndex : 0
  };

  render() {
    const { config, style = {} } = this.props;

    const parseConfigToScenes = (config: Array<Tab>) =>
      config.reduce((acc: { [key: string]: string }, cur, index) => {
        acc[cur.title] = cur.component;
        return acc;
      }, {});

    const parseConfigToRoutes = (config: Array<Tab>) =>
      config.map((item: Tab, index: number) => ({
        key: item.title,
        title: item.title
      }));

    return (
      <View style={style}>
        <TabView
          lazy
          navigationState={{
            ...this.state,
            routes: parseConfigToRoutes(config)
          }}
          renderScene={SceneMap(parseConfigToScenes(config))}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          swipeEnabled={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={defaultTabsStyles.itemSelectedText}
              style={defaultTabsStyles.tabsBar}
              labelStyle={defaultTabsStyles.itemText}
              scrollEnabled
              tabStyle={{ width: 'auto' }}
              renderLabel={({ route, focused }) => (
                <Text
                  style={
                    focused
                      ? defaultTabsStyles.selectedLabel
                      : defaultTabsStyles.itemText
                  }>
                  {route.title}
                </Text>
              )}
            />
          )}
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
  }
});
