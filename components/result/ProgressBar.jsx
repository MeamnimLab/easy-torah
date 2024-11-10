import { StyleSheet, View } from "react-native";

const ProgressBar = (props) => {
  const { correctAnswers, totalQuestions } = props;
  const width = `${Math.round((correctAnswers / totalQuestions) * 100)}%`;
  return (
    <View style={styles.root}>
      <View style={[styles.progress, { width }]} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 8,
    borderRadius: 9999,
    backgroundColor: "#f87171",
  },
  progress: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: "#4ade80",
  },
});
