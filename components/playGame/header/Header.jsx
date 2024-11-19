import { View, StyleSheet, ScrollView } from "react-native";
import QuestionNumbers from "./QuestionNumber";
import { Appbar, useTheme } from "react-native-paper";

const Header = (props) => {
  const { current, onBackPress, onQuestionTouch } = props;

  const { colors } = useTheme();

  return (
    // <View style={{ backgroundColor: colors.myBeige }}>
    <Appbar.Header
      style={[
        styles.root,
        {
          backgroundColor: colors.myBeige,
          shadowColor: colors.headerShadowColor,
          elevation: 5,
        },
      ]}
    >
      <Appbar.BackAction onPress={onBackPress} />
      <ScrollView
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <QuestionNumbers current={current} onQuestionTouch={onQuestionTouch} />
      </ScrollView>
    </Appbar.Header>
    // </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
    marginRight: 16,
  },
});
