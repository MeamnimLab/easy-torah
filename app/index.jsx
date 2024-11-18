import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import HomePage from "../screens/Home";
import ResultPage from "../screens/Result";
import AddGamePage from "../screens/AddGame";
import SubLevelsPage from "../screens/SubLevels";
import CreateTrueFalsePage from "../screens/createGame/TrueFalse";
import PlayGamePage from "../screens/playGame/Play";
import store from "../redux/store";

const Stack = createStackNavigator();


const customColors = {
  myOrange: "#F6BD60",  // Light Orange
  myBeige: "#F7EDE2",  // Light Beige
  myPink: "#F5CAC3",  // Light Pink
  myGreen: "#84A59D",  // Muted Green
  myRed: "#F28482",  // Soft Red
  myGray: "#e5e5e5",
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...customColors,
    background: customColors.myBeige,
  },
};

export default function Index() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Result" component={ResultPage} />
            <Stack.Screen name="AddGame" component={AddGamePage} />
            <Stack.Screen name="SubLevels" component={SubLevelsPage} />
            <Stack.Screen
              name="PlayGame"
              component={PlayGamePage}
              options={{
                headerShown: true,
                header: () => null,
              }}
            />
            {/* <Stack.Screen name="AllGames" component={AllGamesPage} />
            <Stack.Screen name="CreateTrivia" component={CreateTriviaPage} /> */}
            <Stack.Screen
              name="CreateTrueFalse"
              component={CreateTrueFalsePage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
