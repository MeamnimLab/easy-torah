import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { Appbar, PaperProvider } from "react-native-paper";

import { theme } from "../styles/theme";
import store from "../redux/store";
import { LanguageProvider } from "../components/context/LanguageContext";
import DrawerMenu from "../components/DrawerMenu";
import HomePage from "../screens/Home";
import ResultPage from "../screens/Result";
import AddGamePage from "../screens/AddGame";
import SubLevelsPage from "../screens/SubLevels";
import AllLevelsPage from "../screens/create/Levels";
import AllSubLevelsPage from "../screens/create/SubLevels";
import AllSubLevelGamesPage from "../screens/create/Games";
import CreateTrueFalsePage from "../screens/createGame/TrueFalse";
import PlayGamePage from "../screens/playGame/Play";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const animationFinishHandler = () => {
    setIsSplashVisible(false);
  };

  const menuPressHandler = () => {
    setDrawerVisible((state) => !state);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const menuHeader = (
    <>
      <Appbar.Action
        icon="menu"
        onPress={menuPressHandler}
        style={{ marginHorizontal: 10 }}
      />
      <Appbar.Content />
    </>
  );

  let content = <SplashScreen onAnimationFinish={animationFinishHandler} />;

  if (!isSplashVisible) {
    content = (
      <>
        <Stack.Navigator
          initialRouteName="LevelsOfCreate"
          // initialRouteName="Home"
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.colors.myBeige,
              shadowColor: theme.colors.headerShadowColor,
              elevation: 5,
            },
            headerTitleStyle: {
              display: "none",
            },
            headerRight: () => (menuHeader),
          }}
        >
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Result" component={ResultPage} />
          <Stack.Screen name="AddGame" component={AddGamePage} />
          <Stack.Screen name="SubLevels" component={SubLevelsPage} />
          <Stack.Screen name="LevelsOfCreate" component={AllLevelsPage} />
          <Stack.Screen name="SubLevelsOfCreate" component={AllSubLevelsPage} />
          <Stack.Screen name="SubLevelGamesOfCreate" component={AllSubLevelGamesPage} />
          <Stack.Screen name="PlayGame" component={PlayGamePage} />
          <Stack.Screen
            name="CreateTrueFalse"
            component={CreateTrueFalsePage}
          />
        </Stack.Navigator>

        <DrawerMenu visible={drawerVisible} onClose={closeDrawer} />
      </>
    );
  }

  return (
    <Provider store={store}>
      <LanguageProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer independent={true}>
            {content}
          </NavigationContainer>
        </PaperProvider>
      </LanguageProvider>
    </Provider>
  );
}
