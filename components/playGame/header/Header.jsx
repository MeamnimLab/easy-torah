import { Platform, View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuestionNumbers from "./QuestionNumber";
import { HeaderBackButton } from "@react-navigation/elements";

const Header = (props) => {
  const { current, onBackPress, onQuestionTouch } = props;
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }}>
      <View style={styles.root}>
        <HeaderBackButton labelVisible={false} onPress={onBackPress} />
        <ScrollView
          style={styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <QuestionNumbers
            current={current}
            onQuestionTouch={onQuestionTouch}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.select({
      android: 8,
      default: 0,
    }),
  },
  scrollView: {
    flexGrow: 1,
    marginRight: 16,
  },
});
