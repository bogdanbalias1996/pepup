import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './Countdown.styles';

export type CountdownProps = {
  timeInSeconds: number;
  isRunning: boolean;
  onFinish?: (currentSecond: number) => void;
  onTick?: (currentSecond: number) => void;
}

export type CountdownState = {
  timerOn: boolean;
  timerStart: number;
  timerTime: number;
}

export class Countdown extends React.Component<CountdownProps, CountdownState> {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  }

  timer: any;

  static getDerivedStateFromProps(props: any, state: any) {
    if (!state.timerTime && props.timeInSeconds) {
      return {
        ...state,
        timerTime: props.timeInSeconds * 1000
      }
    }

    return null;
  }

  componentDidMount() {
    if (this.props.isRunning) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    if (this.props.isRunning !== this.state.timerOn) {
      if (this.props.isRunning) {
        this.startTimer()
      } else {
        this.stopTimer();
        this.resetTimer();
      }
    }
  }

  startTimer = () => {
    const { timerTime } = this.state;

    this.setState({
      timerOn: true,
      timerTime,
      timerStart: timerTime
    });

    this.timer = setInterval(() => {
      const { onTick, onFinish } = this.props;
      const newTime = this.state.timerTime - 1000;
      const curentSecond = newTime/1000;

      if (onTick) onTick(curentSecond)

      if (newTime > 0) {
        this.setState({ timerTime: newTime });
      } else {
        clearInterval(this.timer);
        if (onFinish) onFinish(curentSecond);
        this.setState({ timerOn: false });
      }
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    this.setState({
      timerOn: false,
      timerTime: this.state.timerStart
    });
  };

  render() {
    const { timerTime } = this.state;
    const seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    const minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    const hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>{`${hours} : ${minutes} : ${seconds}`}</Text>
      </View>
    )
  }
}