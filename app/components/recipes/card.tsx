import { format } from "date-fns";

import {
  VStack,
  Box,
  Text,
  Image,
  Skeleton,
  AspectRatio,
  Stack,
  Heading,
  HStack,
  Pressable,
} from "@gluestack-ui/themed";

import { Recipe } from "../../types";

import { GestureResponderEvent } from "react-native";

interface RecipeCardProps extends Recipe {
  onPress: (event: GestureResponderEvent) => void;
}

// TODO: Do better Adriana, this alignment ain't good
export const RecipeCardSkeleton = () => {
  return (
    <Box alignItems="center" width="full">
      <Box
        maxW="80"
        width="80"
        borderRadius="lg"
        borderWidth="1"
        borderColor="gray.200"
      >
        <VStack space="4" p="2">
          <Skeleton flex="1" height="80" rounded="md" bgColor="gray.100" />
          <Box px="4" pt="4">
            <Skeleton flex="1" height="5" rounded="md" bgColor="gray.100" />
          </Box>
          <VStack space="4">
            <Skeleton flex="1" height="5" rounded="md" bgColor="gray.100" />
            <Skeleton flex="1" height="5" rounded="md" bgColor="gray.100" />
            <Skeleton flex="1" height="5" rounded="md" bgColor="gray.100" />
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export const RecipeCard = ({
  name,
  description,
  createdAt,
  updatedAt,
  onPress,
}: RecipeCardProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box alignItems="center">
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {name}
              </Heading>
              <Text
                size="xs"
                _light={{
                  color: "violet.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                The Silicon Valley of India.
              </Text>
            </Stack>
            <Text fontWeight="400" noOfLines={3}>
              {description}
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  {format(new Date(createdAt), "MM/dd/yyyy")}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  {format(new Date(updatedAt), "MM/dd/yyyy")}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
};
