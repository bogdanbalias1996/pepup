import * as React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './Onboarding.styles';
import { navigate } from '../../navigationService';
import { ButtonStyled } from '../../components/ButtonStyled/ButtonStyled';

import Storage from '../../common/utils/Storage';

import { PepupBackground } from '../../components/PepupBackground/PepupBackground';

export const IS_ONBOARDING_PASSED = 'OnboardingPassed';
const slides = [
  {
    key: '1',
    title: 'PEPUP',
    description: 'yo life with personalized videos \n from people you love',
    imageSrc: require('../../../assets/onboarding/connect.png')
  },
  {
    key: '2',
    title: 'EVENTS',
    description: 'Attend exclusive events and \n party in style',
    imageSrc: require('../../../assets/onboarding/mungle.png')
  },
  {
    key: '3',
    title: 'CONTESTS',
    description: 'Participate in a variety of \n contests and win prizes',
    imageSrc: require('../../../assets/onboarding/dazzle.png')
  },
  {
    key: '4',
    title: 'STORE',
    description: 'Shop and collect original \n celebrity apparel & merchandize',
    imageSrc: require('../../../assets/onboarding/indulge.png')
  }
];

export class OnboardingScreen extends React.Component {
  state = {
    lastSlide: false,
    height: 0,
    isLoaded: false
  };

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  _renderItem = ({ item }: any) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={item.imageSrc}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description}</Text>

          {item.key === '4' && (
            <ButtonStyled
              style={styles.buttonStyle}
              onPress={() => this._onDone()}
              text={'Get Started'.toUpperCase()}
              type="white"
            />
          )}
        </View>
      </View>
    );
  };

  _onDone = () => {
    Storage.set(true, IS_ONBOARDING_PASSED);
    navigate({ routeName: 'Auth' });
  };

  onChange = (index: number) => {
    this.setState({ lastSlide: index === slides.length - 1 });
  };

  render() {
    return (
      <PepupBackground style={{ paddingTop: 0 }}>
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          showNextButton={false}
          dotStyle={styles.dotStyle}
          onSlideChange={this.onChange}
          hidePagination={this.state.lastSlide}
          activeDotStyle={styles.activeDotStyle}
          paginationStyle={styles.paginationStyle as any}
          doneLabel=""
        />
      </PepupBackground>
    );
  }
}
