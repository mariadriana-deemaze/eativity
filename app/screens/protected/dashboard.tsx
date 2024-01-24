import { useEffect, useState } from "react";

import { Box, HStack, Image, Pressable, Text, VStack, View } from "native-base";

import { IRootState, useAppDispatch } from "../../stores";

import { getUserInfo } from "../../stores/user/actions";

import { useSelector } from "react-redux";

import { DUMMY_RECOMMENDED_RECIPES, greetUser } from "../../utils";

import { ScrollView } from "react-native-gesture-handler";

export const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // TODO: Abstract inside slider component

  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const userSliceState = useSelector((state: IRootState) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [authStateSlice.userToken]);

  return (
    <Box flex="1" bg="gray.100" px="4">
      {userSliceState.user ? (
        <VStack space="3">
          <Text
            fontFamily="PlusJakartaSans_600SemiBold"
            color="green.700"
            fontSize="lg"
            isTruncated
          >
            {greetUser(userSliceState.user?.name)}
          </Text>
          <Text
            fontFamily="PlusJakartaSans_600SemiBold"
            color="gray.800"
            fontSize="lg"
            isTruncated
          >
            Have you eaten breakfast yet?
          </Text>
          <Text
            fontFamily="PlusJakartaSans_600SemiBold"
            color="gray.400"
            fontSize="md"
          >
            Here’s some easy recipes adapted to your current macros.
          </Text>

          <ScrollView horizontal>
            {DUMMY_RECOMMENDED_RECIPES.map((recipe, index) => {
              return (
                <Pressable
                  key={`recipe_${recipe.id}`}
                  onPress={() => setCurrentSlide(index)}
                >
                  <Image
                    height="40"
                    alt={`Cover image for recipe ${recipe.name}`}
                    width={index === 0 ? "56" : "32"}
                    borderRadius="md"
                    source={{
                      uri: recipe.image,
                    }}
                  />
                </Pressable>
              );
            })}
          </ScrollView>

          <VStack space="2">
            <HStack>
              <HStack space="1">
                <View bg="red.500" height="3" width="3" borderRadius="3" />
                <Text
                  fontFamily="PlusJakartaSans_200ExtraLight"
                  color="gray.800"
                  fontSize="xs"
                  isTruncated
                >
                  {DUMMY_RECOMMENDED_RECIPES[currentSlide].fats}% fats
                </Text>
              </HStack>
              <HStack space="1">
                <View bg="blue.500" height="3" width="3" borderRadius="3" />
                <Text
                  fontFamily="PlusJakartaSans_200ExtraLight"
                  color="gray.800"
                  fontSize="xs"
                  isTruncated
                >
                  {DUMMY_RECOMMENDED_RECIPES[currentSlide].carbohydrates}%
                  carbohydrates
                </Text>
              </HStack>
              <HStack space="1">
                <View bg="green.500" height="3" width="3" borderRadius="3" />
                <Text
                  fontFamily="PlusJakartaSans_200ExtraLight"
                  color="gray.800"
                  fontSize="xs"
                  isTruncated
                >
                  {DUMMY_RECOMMENDED_RECIPES[currentSlide].proteins}% proteins
                </Text>
              </HStack>
            </HStack>
            <Text>{DUMMY_RECOMMENDED_RECIPES[currentSlide].name}</Text>
            <Text>{DUMMY_RECOMMENDED_RECIPES[currentSlide].description}</Text>
          </VStack>
        </VStack>
      ) : (
        <>
          <Text>Skeleton here</Text>
        </>
      )}
    </Box>
  );
};
