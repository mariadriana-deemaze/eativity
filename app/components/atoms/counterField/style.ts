import { StyleProp, ViewStyle } from "react-native";

import { StyledProps } from "native-base";

export const buttonWrapperStyles: StyledProps = {
  bg: "gray.200",
  rounded: "full",
  alignItems: "center",
};

export const buttonStyles: StyleProp<ViewStyle> = {
  width: 30,
  height: 30,
  alignSelf: "center",
};
