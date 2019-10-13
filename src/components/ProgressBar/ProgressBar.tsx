import * as React from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import styles from './ProgressBar.styles';

export type ProgressBarProps = {
  seconds: number;
  isRunning: boolean;
  style?: any;
}

export type ProgressBarState = {
  currentTimeValue: Animated.Value;
  isRunning: boolean;
}

export class ProgressBar extends React.PureComponent<ProgressBarProps, ProgressBarState> {
  constructor(props: ProgressBarProps) {
    super(props);

    this.state = {
      currentTimeValue: new Animated.Value(100),
      isRunning: false
    }
  }

  static getDerivedStateFromProps(props: ProgressBarProps, state: ProgressBarState) {
    if (props.isRunning !== state.isRunning) {
      return {
        isRunning: props.isRunning
      }
    }

    return null;
  }

  render() {
    const { currentTimeValue, isRunning } = this.state;
    const { seconds, style } = this.props;
    const miliseconds = seconds * 1000;

    const anim = Animated.timing(
      currentTimeValue,
      {
        toValue: 0,
        duration: miliseconds,
        easing: Easing.linear
      }
    )

    if (isRunning) {
      anim.start()
    } else {
      currentTimeValue.stopAnimation((val) => {
        if (val < 100) {
          this.setState({
            currentTimeValue: new Animated.Value(100)
          })
        }
      })
    }

    return (
      <View style={[styles.wrapper, style || {}]}>
        <Animated.View style={{
          ...styles.progress,
          width: currentTimeValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['100%', '0%']
          })
        }}></Animated.View>
      </View>
    )
  }
}