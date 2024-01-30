import { useEffect, useMemo, useRef, useState } from "react";

import {
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
  FlatList,
  Badge,
  PresenceTransition,
  Skeleton,
} from "native-base";

import { FlatListComponent, FlatListProps } from "react-native";

import { IRootState, useAppDispatch } from "../../stores";

import { getUserInfo } from "../../stores/user/actions";

import { useSelector } from "react-redux";

import {
  DUMMY_RECOMMENDED_RECIPES,
  DUMMY_USER_DAILY_MEALS,
  greetMissingMeal,
  gretting,
} from "../../utils";

import { Recipe } from "../../types";

import { lightTheme as theme } from "../../theme";

const GreetingSkeleton = () => {
  return (
    <VStack space="4" px="4">
      <VStack space="1">
        <Skeleton
          height="5"
          width="32"
          rounded="md"
          bgColor={theme.background.secondary}
          startColor={theme.background.primary}
        />
        <Skeleton
          height="5"
          width="48"
          rounded="md"
          bgColor={theme.background.secondary}
          startColor={theme.background.primary}
        />
      </VStack>
      <Skeleton
        height="5"
        width="72"
        rounded="md"
        bgColor={theme.background.secondary}
        startColor={theme.background.primary}
      />
      <Skeleton
        height="5"
        width="64"
        rounded="md"
        bgColor={theme.background.secondary}
        startColor={theme.background.primary}
      />
    </VStack>
  );
};

const SliderSkeleton = () => {
  return (
    <VStack space="3" px="4">
      <HStack space="3">
        <Skeleton
          height="40"
          width="48"
          rounded="md"
          bgColor={theme.background.secondary}
          startColor={theme.background.primary}
        />
        <Skeleton
          height="40"
          width="20"
          rounded="md"
          bgColor={theme.background.secondary}
          startColor={theme.background.primary}
        />
        <Skeleton
          height="40"
          width="20"
          rounded="md"
          bgColor={theme.background.secondary}
          startColor={theme.background.primary}
        />
      </HStack>
      <Skeleton
        height="5"
        width="32"
        rounded="md"
        bgColor={theme.background.secondary}
        startColor={theme.background.primary}
      />
      <Skeleton
        height="5"
        width="72"
        rounded="md"
        bgColor={theme.background.secondary}
        startColor={theme.background.primary}
      />
      <Skeleton
        height="5"
        width="64"
        rounded="md"
        bgColor={theme.background.secondary}
        startColor={theme.background.primary}
      />
    </VStack>
  );
};

export const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderInformationVisibility, setSliderInformationVisibility] =
    useState(false);

  const ref = useRef<FlatListComponent<Recipe, FlatListProps<Recipe>>>();

  const authStateSlice = useSelector((state: IRootState) => state.auth);

  const userSliceState = useSelector((state: IRootState) => state.user);

  const dispatch = useAppDispatch();

  const allDataLoaded = userSliceState.user;

  const currentRecipe = useMemo(
    () =>
      sliderInformationVisibility
        ? DUMMY_RECOMMENDED_RECIPES[currentSlide]
        : undefined,
    [currentSlide, sliderInformationVisibility]
  );

  useEffect(() => {
    dispatch(getUserInfo());
  }, [authStateSlice.userToken]);

  useEffect(() => {
    ref?.current?.scrollToIndex({
      animated: true,
      index: currentSlide,
      viewPosition: 0,
    });

    setTimeout(() => {
      setSliderInformationVisibility(true);
    }, 150);
  }, [currentSlide]);

  return (
    <VStack space="10" bg={theme.background.primary} minH="full">
      {/**
       * Greeting
       */}
      <VStack space="6" mt="5">
        {allDataLoaded ? (
          <VStack space="1" px="4">
            <VStack>
              <Text
                fontFamily="PlusJakartaSans_600SemiBold"
                color={theme.text.display.primary}
                fontSize="xl"
                isTruncated
              >
                {`${gretting()},`}
              </Text>
              <Text
                fontFamily="PlusJakartaSans_600SemiBold"
                color={theme.text.display.primary}
                fontSize="xl"
                isTruncated
              >
                {userSliceState.user?.name}.
              </Text>
            </VStack>
            <Text
              fontFamily="PlusJakartaSans_600SemiBold"
              color={theme.text.paragraph.primary}
              fontSize="lg"
              isTruncated
            >
              {greetMissingMeal(DUMMY_USER_DAILY_MEALS)}
            </Text>
            <Text
              fontFamily="PlusJakartaSans_400Regular"
              color={theme.text.paragraph.tertiary}
              fontSize="md"
            >
              Here’s some easy recipes adapted to your current macros.
            </Text>
          </VStack>
        ) : (
          <GreetingSkeleton />
        )}

        {/**
         * Slider
         */}
        {allDataLoaded ? (
          <VStack space="3">
            <FlatList
              ref={ref}
              horizontal
              keyExtractor={(item) => String(item.id)}
              data={DUMMY_RECOMMENDED_RECIPES}
              initialScrollIndex={currentSlide}
              getItemLayout={(_data, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
              renderItem={({ item: recipe, index }) => (
                <Pressable
                  key={`recipe_${recipe.id}`}
                  onPress={() => {
                    if (index !== currentSlide) {
                      setSliderInformationVisibility(false);
                      setCurrentSlide(index);
                    }
                  }}
                >
                  <Image
                    height="40"
                    alt={`Cover image for recipe ${recipe.name}`}
                    width={index === currentSlide ? "48" : "20"}
                    borderRadius="2xl"
                    source={{
                      uri: recipe.image,
                    }}
                  />

                  <HStack
                    position="absolute"
                    bottom="2"
                    left="2"
                    alignSelf="center"
                    space="2"
                  >
                    {index === currentSlide &&
                      recipe.categories?.map((category) => (
                        <Badge
                          key={`${recipe.id}_badge_for_${category.id}`}
                          variant="subtle"
                        >
                          {category.title}
                        </Badge>
                      ))}
                  </HStack>
                </Pressable>
              )}
              contentContainerStyle={{
                paddingLeft: 10,
                paddingRight: 10,
              }}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />

            <VStack
              space="2"
              px="4"
              width="100%"
              alignItems="flex-start"
              minHeight="32"
            >
              <PresenceTransition
                visible={sliderInformationVisibility}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  translateY: 10,
                  transition: {
                    duration: 250,
                  },
                }}
              >
                {currentRecipe && (
                  <VStack space="2" width="100%" alignItems="flex-start">
                    <HStack
                      space="3"
                      bg={theme.background.secondary}
                      py="1"
                      px="2"
                      borderRadius="full"
                    >
                      <HStack space="1" alignItems="center">
                        <View
                          bg={theme.blue.primary}
                          height="2"
                          width="2"
                          borderRadius="full"
                        />
                        <Text
                          fontFamily="PlusJakartaSans_200ExtraLight"
                          color={theme.text.paragraph.secondary}
                          fontSize="xs"
                          isTruncated
                        >
                          {currentRecipe.proteins} protein
                        </Text>
                      </HStack>
                      <HStack space="1" alignItems="center">
                        <View
                          bg={theme.red.primary}
                          height="2"
                          width="2"
                          borderRadius="full"
                        />
                        <Text
                          fontFamily="PlusJakartaSans_200ExtraLight"
                          color={theme.text.paragraph.secondary}
                          fontSize="xs"
                          isTruncated
                        >
                          {currentRecipe.fats} fat
                        </Text>
                      </HStack>
                      <HStack space="1" alignItems="center">
                        <View
                          bg={theme.purple.primary}
                          height="2"
                          width="2"
                          borderRadius="full"
                        />
                        <Text
                          fontFamily="PlusJakartaSans_200ExtraLight"
                          color={theme.text.paragraph.secondary}
                          fontSize="xs"
                          isTruncated
                        >
                          {currentRecipe.carbohydrates} carbs
                        </Text>
                      </HStack>
                    </HStack>
                    <VStack space="1">
                      <Text
                        fontFamily="PlusJakartaSans_600SemiBold"
                        color={theme.text.paragraph.primary}
                        fontSize="md"
                        isTruncated
                      >
                        {currentRecipe.name}
                      </Text>
                      <Text
                        fontFamily="PlusJakartaSans_200ExtraLight"
                        color={theme.text.paragraph.secondary}
                        fontSize="sm"
                        numberOfLines={2}
                        isTruncated
                      >
                        {currentRecipe.description}
                      </Text>
                    </VStack>
                  </VStack>
                )}
              </PresenceTransition>
            </VStack>
          </VStack>
        ) : (
          <SliderSkeleton />
        )}
      </VStack>

      {/**
       * Future sections
       */}
      <VStack space="6" px="4">
        <Text
          fontFamily="PlusJakartaSans_600SemiBold"
          color={theme.text.paragraph.primary}
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
