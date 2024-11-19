import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { customColors } from "./colors";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...customColors,
    background: customColors.myBeige,
  },
};
