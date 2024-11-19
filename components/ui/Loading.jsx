import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";

const Loading = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.loadingContainer, { backgroundColor: colors.myBeige }]}
    >
      <LottieView
        source={require("../../assets/images/loading.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
