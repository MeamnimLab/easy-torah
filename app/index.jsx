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
import AllGamesPage from "../screens/AllGames";
import CreateTriviaPage from "../screens/createGame/Trivia";
import CreateTrueFalsePage from "../screens/createGame/TrueFalse";
import PlayGamePage from "../screens/playGame/Play";
import store from "../redux/store";
import NavigationBar from "../components/appBar/NavigationBar";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
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
              header: (props) => <NavigationBar {...props} />,
            }}
          >
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Result" component={ResultPage} />
            <Stack.Screen name="AddGame" component={AddGamePage} />
            <Stack.Screen
              name="PlayGame"
              component={PlayGamePage}
              options={{
                headerShown: true,
                header: () => null,
              }}
            />
            <Stack.Screen name="AllGames" component={AllGamesPage} />
            <Stack.Screen name="CreateTrivia" component={CreateTriviaPage} />
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
