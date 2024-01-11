import { VStack, Box, Divider, Text, Image, Skeleton } from "native-base";

import { Recipe } from "../../types";

export const RecipeCardSkeleton = () => {
  return (
    <Box /* border="1" */ borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
        <Box px="4" pt="4">
          <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
        </Box>
        <Box px="4">
          <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
        </Box>
      </VStack>
    </Box>
  );
};

export const RecipeCard = ({ name, description, image }: Recipe) => {
  return (
    <Box /* border="1" */ borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pb="4">
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg",
              //uri: image
            }}
            alt="Alternate Text"
            size="xl"
          />
        </Box>
        <Box px="4" pt="4">
          <Text
            fontSize="xs"
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            alignSelf="flex-start"
          >
            {name}
          </Text>
        </Box>
        <Box px="4">
          <Text
            fontSize="xs"
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            alignSelf="flex-start"
          >
            {description}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
