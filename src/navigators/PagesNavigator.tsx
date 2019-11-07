import { createStackNavigator } from 'react-navigation';
import { LoadingScreen } from '../pages/Loading/Loading';
import { OnboardingScreen } from '../pages/Onboarding/Onboarding';

export const PagesNavigator = createStackNavigator(
  {
    Onboarding: OnboardingScreen,
    Loading: LoadingScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    headerLayoutPreset: 'center',
    initialRouteName: 'Onboarding'
  }
);
