import * as React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Text, View, Image } from 'react-native';

import styles from './Onboarding.styles';
import { navigate } from '../../navigationService';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';
import { setLocalStorage } from '../../common/utils/session';

export const IS_ONBOARDING_PASSED = 'OnboardingPassed';
const slides = [
  {
    key: '1',
    title: 'CONNECT',
    description: 'Get up-close and personal with your favorite stars',
    imageSrc: require('../../../assets/connect.png')
  },
  {
    key: '2',
    title: 'MINGLE',
    description: 'Attend exclusive events and party in style',
    imageSrc: require('../../../assets/mungle.png')
  },
  {
    key: '3',
    title: 'DAZZLE',
    description: 'Participate in a variety of contests and win prizes',
    imageSrc: require('../../../assets/dazzle.png')
  },
  {
    key: '4',
    title: 'INDULGE',
    description: 'Collect original celebrity apparel & merchandize',
    imageSrc: require('../../../assets/indulge.png')
  }
];

export class OnboardingScreen extends React.Component {
  state = {
    lastSlide: false
  };

  _renderItem = (item: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={item.item.imageSrc}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.item.title}</Text>
          <Text style={styles.description}>{item.item.description}</Text>
        </View>
        {item.item.key === '4' && (
          <ButtonStyled
            style={styles.buttonStyle}
            textBold={true}
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
    index === slides.length - 1
      ? this.setState({ lastSlide: true })
      : this.setState({ lastSlide: false });
  };

  render() {
    return (
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
    );
  }
}
