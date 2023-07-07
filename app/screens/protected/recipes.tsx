import { Text } from "react-native";

import { Box } from "native-base";

export const Recipes = () => {
  return (
    <Box
      flex="1"
      alignItems="center"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
      bg="red.400"
    >
      <Text>Recipes</Text>
    </Box>
  );
};