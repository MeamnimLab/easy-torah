import { View, Text, StyleSheet } from "react-native";

const AddGamePage = () => {
  return (
    <View style={styles.screen}>
      <Text>AddGamePage</Text>
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

export default AddGamePage;
