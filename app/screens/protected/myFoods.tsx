import { Box, Text } from "native-base";

export const MyFoods = () => {
  return (
    <Box flex="1" alignItems="center">
      <Text isTruncated maxW="300" w="80%" fontSize="lg">
        My Foods screen
      </Text>
    </Box>
  );
};
