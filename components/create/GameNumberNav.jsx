import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Pressable, View, Text, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

const GameNumberNav = ({
  currentIndex,
  onQuestionTouch,
  questionsAmount,
  onAddPress,
}) => {
  const { colors } = useTheme();

  const numberQuestion = Array.from({ length: questionsAmount }, (_, index) => {
    const circleStyles = { backgroundColor: null };
    if (currentIndex === index) {
      // circleStyles.borderWidth = 2;
      circleStyles.backgroundColor = colors.myOrange;
    } else {
      circleStyles.backgroundColor = colors.myGray;
    }

    return (
      <Pressable key={index} onPress={() => onQuestionTouch(index)}>
        <View style={[styles.circle, circleStyles]}>
          <Text style={styles.numberText}>{index + 1}</Text>
        </View>
      </Pressable>
    );
  });

  // Add the "+" circle at the end
  numberQuestion.push(
    <Pressable key="add" onPress={onAddPress}>
      {/* <View
        style={[
          styles.circle,
          { borderWidth: 2, borderColor: colors.myGray },
        ]}
      > */}
        <Ionicons name="add-circle-outline" size={29} color={colors.myGreen} />
      {/* </View> */}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {numberQuestion}
      </ScrollView>
    </View>
  );
};

export default GameNumberNav;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  scrollView: {
    flexGrow: 1,
    marginRight: 16,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  numberText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
