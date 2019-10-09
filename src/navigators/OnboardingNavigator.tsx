import { createStackNavigator } from 'react-navigation'
import { OnboardingScreen } from '../pages/Onboarding/Onboarding'

export const OnboardingNavigator = createStackNavigator({
  Onboarding: {
    screen: OnboardingScreen,
    navigationOptions: ({ navigation, screenProps }: any) => ({
      header: null
    })
  },
}, {
    headerLayoutPreset: 'center'
  })
