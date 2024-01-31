import { Box, Pressable, Skeleton, Text } from "native-base";

import { GestureResponderEvent } from "react-native";

import { lightTheme as theme } from "../../theme";

export const MenuPillsSkeleton = () => {
  return (
    <Box mx="2" height="8" width="32">
      <Skeleton rounded="full" bgColor="gray.100" height="8" width="32" />
    </Box>
  );
};

export const MenuPills = ({
  title,
  isActive,
  onPress,
}: {
  title;
  isActive: boolean;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        display="flex"
        justifyItems="center"
        justifyContent="center"
        mx="2"
        px="4"
        height="8"
        borderRadius="full"
        bgColor={isActive ? "green.800" : "green.200"}
      >
        <Text
          fontSize="xs"
          color={theme.text.paragraph.inverted}
          fontWeight={isActive ? "bold" : "medium"}
          alignSelf="flex-start"
        >
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};
