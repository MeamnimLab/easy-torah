import { View, Text, StyleSheet } from "react-native";

const CreateTriviaPage = () => {
  return (
    <View style={styles.screen}>
      <Text>CreateTriviaPage</Text>
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

export default CreateTriviaPage;
