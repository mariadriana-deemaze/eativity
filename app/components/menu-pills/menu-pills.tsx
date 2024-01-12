import { Box, Pressable, Skeleton, Text } from "native-base";
import { GestureResponderEvent } from "react-native";

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
        bgColor={isActive ? "violet.600" : "violet.400"}
      >
        <Text
          fontSize="xs"
          color="white"
          fontWeight={isActive ? "bold" : "medium"}
          alignSelf="flex-start"
        >
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};
