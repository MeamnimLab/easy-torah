import { View, Text, StyleSheet } from "react-native";
import AllGames from '../components/AllGames'

const AllGamesPage = () => {
  return (
    <View style={styles.screen}>
      <Text>AllGamesPage</Text>
      <AllGames/>
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

export default AllGamesPage;
