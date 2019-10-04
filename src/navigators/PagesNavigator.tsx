import { createStackNavigator } from "react-navigation";
import { LoadingScreen } from "../pages/Loading/Loading";

export const PagesNavigator = createStackNavigator(
  {
    Loading: {
      screen: LoadingScreen
    }
  },
  {
    headerLayoutPreset: "center"
  }
);
