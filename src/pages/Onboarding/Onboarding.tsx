import * as React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Text, View } from 'react-native';

import styles from './Onboarding.styles';
import { navigate } from '../../navigationService';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { setLocalStorage } from '../../common/utils/session';
import FastImage from 'react-native-fast-image';
import { Card } from '../../components/Card/Card';
import { PepupBackground } from '../../components/PepupBackground/PepupBackground';

export const IS_ONBOARDING_PASSED = 'OnboardingPassed';
const slides = [
  {
    key: '1',
    title: 'PEPUP',
    description: 'yo life with personalized videos from people you love',
    imageSrc: require('../../../assets/onboarding/connect.png')
  },
  {
    key: '2',
    title: 'EVENTS',
    description: 'Attend exclusive events and party in style',
    imageSrc: require('../../../assets/onboarding/mungle.png')
  },
  {
    key: '3',
    title: 'CONTESTS',
    description: 'Participate in a variety of contests and win prizes',
    imageSrc: require('../../../assets/onboarding/dazzle.png')
  },
  {
    key: '4',
    title: 'STORE',
    description: 'Collect original celebrity apparel & merchandize',
    imageSrc: require('../../../assets/onboarding/indulge.png')
  }
];

export class OnboardingScreen extends React.Component {
  state = {
    lastSlide: false
  };

  _renderItem = (item: any) => {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <FastImage
            style={styles.image}
            source={item.item.imageSrc}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.title}>{item.item.title}</Text>
        </Card>
        <Text style={styles.description}>{item.item.description}</Text>
        {item.item.key === '4' && (
          <ButtonStyled
            style={styles.buttonStyle}
            onPress={() => this._onDone()}
            text={'Get Started'.toUpperCase()}
            type="white"
          />
        )}
      </View>
    );
  };

  _onDone = () => {
    setLocalStorage(true, IS_ONBOARDING_PASSED);
    navigate({ routeName: 'Auth' });
  };

  onChange = (index: number) => {
    this.setState({ lastSlide: index === slides.length - 1 });
  };

  render() {
    return (
      <PepupBackground style={styles.background}>
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          showNextButton={false}
          dotStyle={styles.dotStyle}
          onSlideChange={this.onChange}
          hidePagination={this.state.lastSlide}
          activeDotStyle={styles.activeDotStyle}
          paginationStyle={styles.paginationStyle}
          doneLabel=""
        />
      </PepupBackground>
    );
  }
}
