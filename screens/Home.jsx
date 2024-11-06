import { View, Text, StyleSheet, Button } from "react-native";

const HomePage = ({navigation}) => {
  const allGamesButtonHandler = () => {
    navigation.navigate("AllGames")
  }
  const addGameButtonHandler = () => {
    navigation.navigate("AddGame")
  }

  return (
    <View style={styles.screen}>
      <Button title="All Games" onPress={allGamesButtonHandler}/>
      <Button title="Add Game" onPress={addGameButtonHandler}/>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomePage;
