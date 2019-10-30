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
}

export class ProgressBar extends React.PureComponent<ProgressBarProps, ProgressBarState> {
  constructor(props: ProgressBarProps) {
    super(props);

    this.state = {
      currentTimeValue: new Animated.Value(0)
    }
  }

  render() {
    const { currentTimeValue } = this.state;
    const { seconds, style, isRunning } = this.props;
    const miliseconds = seconds * 1000;
    const anim = Animated.timing(
      currentTimeValue,
      {
        toValue: 100,
        duration: miliseconds,
        easing: (t) => t
      }
    )

    if (isRunning) {
      (currentTimeValue as any)._value === 0 && anim.start();
    } else {
      currentTimeValue.stopAnimation((val) => {
        if (val !== 0) {
          this.setState({
            currentTimeValue: new Animated.Value(0)
          })
        }
      })
    }

    return (
      <View style={[styles.wrapper, style || {}]}>
        <Animated.View
          style={{
            ...styles.progress,
            width: currentTimeValue.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%']
            })
          }}
        />
      </View>
    )
  }
}