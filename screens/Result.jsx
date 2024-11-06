import { View, Text, StyleSheet } from "react-native";

const ResultPage = () => {
  return (
    <View style={styles.screen}>
      <Text>ResultPage</Text>
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

export default ResultPage;
