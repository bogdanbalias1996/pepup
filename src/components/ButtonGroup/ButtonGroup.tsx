import * as React from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './ButtonGroup.styles';
import { ButtonGroupProps, ButtonGroupItem } from './';

export class ButtonGroup extends React.PureComponent<ButtonGroupProps> {
  state: {
    selectedItem: ButtonGroupItem;
  };
  btnGroupRef: any;

  constructor(props: ButtonGroupProps) {
    super(props);

    this.btnGroupRef = React.createRef();

    this.state = {
      selectedItem:
        props.items.find(
          (item: ButtonGroupItem) => item.value === props.value,
        ) || props.items[0],
    };
  }

  handlePress = (item: ButtonGroupItem, index: number) => {
    this.setState({
      selectedItem: item,
    });

    this.btnGroupRef.current.scrollToIndex({animated: true, index, viewPosition: 0.5 })

    if (item.onPress) item.onPress();
  };

  renderItem = ({ item, index }: any) => {
    const { selectedItem } = this.state;
    const {
      items,
      stylesFirstItem = {},
      stylesLastItem = {},
      stylesItem = {},
      stylesSelectedItem = {},
      stylesItemText = {},
      stylesSelectedItemText = {},
      getActiveIndicator = () => null,
    } = this.props;

    const isFirst = index === 0;
    const isLast = index === items.length - 1;
    const isSelected = item.value === selectedItem.value;

    const stylesbuttonGroupItem = [styles.item, stylesItem]
      .concat(isFirst ? [styles.itemFirst, stylesFirstItem] : {})
      .concat(isLast ? [styles.itemLast, stylesLastItem] : {})
      .concat(isSelected ? [styles.itemSelected, stylesSelectedItem] : {});

    const stylesbuttonGroupItemText = [styles.itemText, stylesItemText].concat(
      isSelected ? [styles.itemSelectedText, stylesSelectedItemText] : {},
    );

    const content = item.component ? (
      item.component(isSelected)
    ) : (
      <React.Fragment>
        <Text style={stylesbuttonGroupItemText}>{item.title}</Text>
        {isSelected ? getActiveIndicator() : null}
      </React.Fragment>
    );
    return (
      <TouchableOpacity
        onPress={() => this.handlePress(item, index)}
        style={stylesbuttonGroupItem}
        key={index}>
        {content}
      </TouchableOpacity>
    );
  };

  render() {
    const { items, style = {} } = this.props;

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        ref={this.btnGroupRef}
        renderItem={this.renderItem}
        keyExtractor={(item: any, index: number) => `${index}`}
        style={[styles.container, style]}
      />
    );
  }
}
