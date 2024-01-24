import { useEffect, useState } from "react";

import {
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
  ScrollView,
  Badge,
} from "native-base";

import { IRootState, useAppDispatch } from "../../stores";

import { getUserInfo } from "../../stores/user/actions";

import { useSelector } from "react-redux";

import { DUMMY_RECOMMENDED_RECIPES, gretting } from "../../utils";

export const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // TODO: Abstract inside slider component

  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const userSliceState = useSelector((state: IRootState) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [authStateSlice.userToken]);

  return (
    <VStack space="10" bg="white" minH="full">
      <VStack space="6" mt="5">
        {userSliceState.user ? (
          <VStack space="1" px="4">
            <VStack>
              <Text
                fontFamily="PlusJakartaSans_600SemiBold"
                color="green.700"
                fontSize="xl"
                isTruncated
              >
                {`${gretting()},`}
              </Text>
              <Text
                fontFamily="PlusJakartaSans_600SemiBold"
                color="green.700"
                fontSize="xl"
                isTruncated
              >
                {userSliceState.user?.name}.
              </Text>
            </VStack>
            <Text
              fontFamily="PlusJakartaSans_600SemiBold"
              color="gray.800"
              fontSize="lg"
              isTruncated
            >
              Have you eaten breakfast yet?
            </Text>
            <Text
              fontFamily="PlusJakartaSans_400Regular"
              color="gray.400"
              fontSize="md"
            >
              Here’s some easy recipes adapted to your current macros.
            </Text>
          </VStack>
        ) : (
          <>
            <Text>Skeleton here</Text>
          </>
        )}

        <VStack space="3">
          <ScrollView horizontal px="4">
            <HStack space="3">
              {DUMMY_RECOMMENDED_RECIPES.map((recipe, index) => {
                return (
                  <Pressable
                    key={`recipe_${recipe.id}`}
                    onPress={() => setCurrentSlide(index)}
                  >
                    <Image
                      height="40"
                      alt={`Cover image for recipe ${recipe.name}`}
                      width={index === 0 ? "48" : "20"}
                      borderRadius="2xl"
                      source={{
                        uri: recipe.image,
                      }}
                    />
                    {index === 0 && (
                      <Badge
                        variant="subtle"
                        alignSelf="center"
                        position="absolute"
                        bottom="2"
                        left="2"
                      >
                        Category {/* // TODO: Review */}
                      </Badge>
                    )}
                  </Pressable>
                );
              })}
            </HStack>
          </ScrollView>

          <VStack space="2" px="4" width="100%" alignItems="flex-start">
            <HStack space="3" bg="#F3F3ED" py="1" px="2" borderRadius="full">
              <HStack space="1" alignItems="center">
                <View bg="#628EC2" height="2" width="2" borderRadius="full" />
                <Text
                  fontFamily="PlusJakartaSans_200ExtraLight"
                  color="#565656"
                  fontSize="xs"
                  isTruncated
                >
                  {DUMMY_RECOMMENDED_RECIPES[currentSlide].proteins} protein
                </Text>
              </HStack>
              <HStack space="1" alignItems="center">
                <View bg="#C26262" height="2" width="2" borderRadius="full" />
                <Text
                  fontFamily="PlusJakartaSans_200ExtraLight"
                  color="#565656"
                  fontSize="xs"
                  isTruncated
                >
                  {DUMMY_RECOMMENDED_RECIPES[currentSlide].fats} fat
                </Text>
              </HStack>
              <HStack space="1" alignItems="center">
                <View bg="#A362C2" height="2" width="2" borderRadius="full" />
                <Text
                  fontFamily="PlusJakartaSans_200ExtraLight"
                  color="#565656"
                  fontSize="xs"
                  isTruncated
                >
                  {DUMMY_RECOMMENDED_RECIPES[currentSlide].carbohydrates}
                  carbs
                </Text>
              </HStack>
            </HStack>
            <VStack space="1">
              <Text
                fontFamily="PlusJakartaSans_600SemiBold"
                color="black"
                fontSize="md"
                isTruncated
              >
                {DUMMY_RECOMMENDED_RECIPES[currentSlide].name}
              </Text>
              <Text
                fontFamily="PlusJakartaSans_200ExtraLight"
                color="#565656"
                fontSize="sm"
                numberOfLines={2}
                isTruncated
              >
                {DUMMY_RECOMMENDED_RECIPES[currentSlide].description}
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
      <VStack space="6" px="4">
        <Text
          fontFamily="PlusJakartaSans_600SemiBold"
          color="black"
          fontSize="xl"
          numberOfLines={2}
          isTruncated
        >
          Other section
        </Text>
      </VStack>
    </VStack>
  );
};
