import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
// import useFonts hook
import { useFonts } from "expo-font";
import MovieList from "./components/MovieList";
import DetailScreen from "./components/DetailScreen";

// import AppLoading helper
//https://docs.expo.io/versions/latest/sdk/app-loading/
import AppLoading from "expo-app-loading";
const Stack = createSharedElementStackNavigator();

const customFonts = {
  MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  MontserratSemibold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  OpenSanse: require("./assets/fonts/OpenSans-Regular.ttf"),
  // MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  // MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  // MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
};

const App = () => {
  // the same as Font.loadAsync , the hook returns  true | error
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={MovieList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false }}
          sharedElements={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [
              {
                id: `item.${item.id}.photo`,
                animation: "move",
                resize: "clip",
              },
              {
                id: `item.${item.id}.title`,
                animation: "fade",
                resize: "clip",
              },
              {
                id: `item.${item.id}.date`,
                animation: "fade",
                resize: "clip",
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
