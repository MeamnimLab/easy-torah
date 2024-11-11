import { Platform, View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuestionNumbers from "./QuestionNumber";
import { HeaderBackButton } from "@react-navigation/elements";
import { Appbar } from "react-native-paper";

const Header = (props) => {
  const { current, onBackPress, onQuestionTouch } = props;
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }}>
      <Appbar.Header style={styles.root}>
        <Appbar.BackAction onPress={onBackPress} />
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
      </Appbar.Header>
    </View>
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
