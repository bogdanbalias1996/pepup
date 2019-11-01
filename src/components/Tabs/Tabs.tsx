import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TabsProps, Tab } from "./";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import { ButtonGroupItem } from "../../components/ButtonGroup";

export class Tabs extends React.PureComponent<TabsProps> {
  state = {
    activeTabIndex: this.props.activeTabIndex ? this.props.activeTabIndex : 0
  };

  render() {
    const {
      config,
      style = {},
      stylesTabsContainer = {},
      stylesItem = {},
      stylesItemText = {},
      stylesSelectedItem = {},
      stylesSelectedItemText = {}
    } = this.props;
    const { activeTabIndex } = this.state;
    const TabComponent = config[activeTabIndex].component;

    const convertTabsToButtonGroupConfi = (
      config: Array<Tab>
    ): Array<ButtonGroupItem> => {
      return config.map((item: Tab, index: number) => {

        return {
          value: index,
          title: item.title || "",
          component: item.titleComponent
            ? (isActive: boolean) => item.titleComponent(isActive)
            : null,
          onPress: () => {
            if (item.onPress) item.onPress();
            this.setState({ activeTabIndex: index });
          }
        };
      });
    };

    return (
      <View style={style}>
        <ButtonGroup
          items={convertTabsToButtonGroupConfi(config)}
          value={activeTabIndex}
          style={stylesTabsContainer}
          stylesItem={stylesItem}
          stylesItemText={stylesItemText}
          stylesSelectedItem={stylesSelectedItem}
          stylesSelectedItemText={stylesSelectedItemText}
        />
        <TabComponent />
      </View>
    );
  }
}

export const defaultTabsStyles = StyleSheet.create({
  roundedTabs: {
    flex: 0,
    borderRadius: 24,
    backgroundColor: "transparent",
    marginRight: 13,
    paddingTop: 5,
    paddingBottom: 5
  }
});
