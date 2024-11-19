import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper";

export default function SplashScreen({ onAnimationFinish }) {
  const { colors } = useTheme();
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.myBeige }]}>
      <LottieView
        source={require("../assets/images/animation.json")}
        autoPlay
        onAnimationFinish={onAnimationFinish}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
