import { View, Text, StyleSheet } from "react-native";
import QuizPage from './QuizPage'

const AddGamePage = () => {
  return (
    <QuizPage/>
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
