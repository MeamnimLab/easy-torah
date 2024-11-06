import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import HomePage from "../screens/Home";
import ResultPage from "../screens/Result";
import AddGamePage from "../screens/AddGame";
import AllGamesPage from "../screens/AllGames";
import CreateTriviaPage from "../screens/createGame/Trivia";
import CreateTrueFalsePage from "../screens/createGame/TrueFalse";
import PlayTriviaPage from "../screens/playGame/Trivia";
import PlayTrueFalsePage from "../screens/playGame/TrueFalse";
import store from '../redux/store'

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Result" component={ResultPage} />
          <Stack.Screen name="AddGame" component={AddGamePage} />
          <Stack.Screen name="AllGames" component={AllGamesPage} />
          <Stack.Screen name="CreateTrivia" component={CreateTriviaPage} />
          <Stack.Screen
            name="CreateTrueFalse"
            component={CreateTrueFalsePage}
          />
          <Stack.Screen name="PlayTrivia" component={PlayTriviaPage} />
          <Stack.Screen name="PlayTrueFalse" component={PlayTrueFalsePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
