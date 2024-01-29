/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";

import {
  View,
  Text,
  Divider,
  HStack,
  Button,
  VStack,
  Actionsheet,
  Box,
  FlatList,
  Pressable,
  Image,
} from "native-base";

import {
  MealLog,
  MealType,
  PatchMealLogEntry,
  PostMealLogEntry,
} from "../../types";

import { lightTheme as theme } from "../../theme";

import { pluralize } from "../../utils";

import { TextField } from "../atoms/textField";
import { Controller, UseFormReturn } from "react-hook-form";
import { useAppDispatch } from "../../stores";
import { createLogEntry } from "../../stores/dailylog/actions";

export const DailyLogMealTypeSection = ({
  title,
  data,
  inAddFlow,
  setInAddLogFlow,
  formInstance: {
    getFieldState,
    getValues,
    setValue,
    control,
    formState: { errors },
  },
}: {
  title: MealType;
  data: MealLog[];
  inAddFlow: boolean;
  setInAddLogFlow: React.Dispatch<React.SetStateAction<MealType>>;
  formInstance: UseFormReturn<
    PostMealLogEntry | PatchMealLogEntry,
    any,
    undefined
  >;
}) => {
  const dispatch = useAppDispatch();

  const DUMMY_AUTOCOMPLETE_FOOD = [
    { name: "hello", id: "1" },
    { name: "bye", id: "2" },
    { name: "goodbye", id: "3" },
    { name: "potato", id: "4" },
    { name: "potito", id: "5" },
    { name: "hipopotamo", id: "6" },
    { name: "potito", id: "7" },
    { name: "hipopotamo", id: "8" },
    { name: "hipopotamo", id: "9" },
    { name: "hipopotamo", id: "10" },
    { name: "hipopotamo", id: "11" },
    { name: "hipopotamo", id: "12" },
    { name: "hipopotamo", id: "13" },
  ];

  const onAdd = () => {
    setInAddLogFlow(title);
    setValue("type", title);
  };

  const loadMore = () => {
    // TODO: loadMore from current search
  };

  const handleLogUpdate = () => {
    const data = getValues();
    dispatch(createLogEntry(data));
  };

  const sectionIntakesSum = useMemo(() => {
    let result = {
      fats: 0,
      calories: 0,
      carbohydrates: 0,
      proteins: 0,
      total: 0,
    };

    data.forEach(
      (log) =>
        (result = {
          fats: result.fats + log.food.fats * log.quantity,
          carbohydrates:
            result.carbohydrates + log.food.carbohydrates * log.quantity,
          proteins: result.proteins + log.food.proteins * log.quantity,
          calories: result.calories + log.food.calories * log.quantity,
          total: result.total + log.quantity,
        })
    );

    return result;
  }, [data]);

  return (
    <>
      <View
        width="100%"
        borderWidth={1}
        borderRadius="lg"
        borderColor={theme.background.secondary}
        background={theme.background.primary}
      >
        <HStack justifyContent="space-between" px="2" py="3">
          <Text
            fontFamily="PlusJakartaSans_600SemiBold"
            color={theme.text.paragraph.primary}
            fontSize="lg"
          >
            {title}
          </Text>
          <Text
            fontFamily="PlusJakartaSans_400Regular"
            color={theme.text.paragraph.primary}
            fontSize="sm"
          >
            {sectionIntakesSum.total}{" "}
            {pluralize(sectionIntakesSum.total, "item")}
          </Text>
        </HStack>

        <Divider />

        <VStack width="100%" space="2" alignItems="center" px="2" py="3">
          {data ? (
            data.map((log) => (
              <VStack
                key={log.food.id}
                width="100%"
                py="3"
                px="2"
                backgroundColor={theme.background.secondary}
              >
                <Text isTruncated>
                  {log.quantity}x {log.food.name}
                </Text>
                <HStack space="3">
                  <Text>{log.food.calories}</Text>

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
                      {log.food.fats} {pluralize(log.food.fats, "fat")}
                    </Text>
                  </HStack>
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
                      {log.food.proteins}{" "}
                      {pluralize(log.food.proteins, "protein")}
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
                      {log.food.carbohydrates}{" "}
                      {pluralize(log.food.carbohydrates, "carb")}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            ))
          ) : (
            <Text>Eat something dawg</Text>
          )}
        </VStack>

        <Divider />

        <HStack space="2" alignItems="center" px="2" py="3">
          <Button onPress={onAdd} colorScheme="green">
            Add food
          </Button>
          <Text>You are totalling {sectionIntakesSum.calories} kcal.</Text>
        </HStack>
      </View>
      <Actionsheet
        isOpen={inAddFlow}
        onClose={() => setInAddLogFlow(undefined)}
      >
        <Actionsheet.Content>
          <Box w="100%" px={4} justifyContent="center" borderWidth={2}>
            <Text>Add new {getValues("type")} entry.</Text>

            <VStack>
              <Text>adddding stuff TYPE: {getValues("type")}</Text>
              <Text>adddding stuff FOOD_ID: {getValues("foodId")}</Text>
              <Text>adddding stuff QUANTITY: {getValues("quantity")}</Text>
            </VStack>

            <TextField label="Search food" />

            <FlatList
              contentContainerStyle={{
                borderWidth: 2,
                borderColor: "red",
                justifyContent: "space-between",
                alignContent: "space-between",
                alignItems: "center",
              }}
              height="56"
              numColumns={4}
              keyExtractor={(item) => item.id}
              data={DUMMY_AUTOCOMPLETE_FOOD}
              renderItem={({ item }) => {
                // @ts-ignore
                const selected = getValues("foodId") === item.id;

                return (
                  <Pressable
                    width="25%"
                    height="24"
                    onPress={() => setValue("foodId", Number(item.id))}
                  >
                    <Box
                      width="100%"
                      height="100%"
                      p="2"
                      borderRadius="sm"
                      borderWidth={selected ? 2 : 1}
                      borderColor={selected ? "blue.900" : "gray.200"}
                      justifyItems="center"
                      alignItems="center"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        justifyContent="space-between"
                        alignItems="center"
                        borderWidth={1}
                        borderColor="orange.800"
                      >
                        <Image
                          height="10"
                          width="10"
                          source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg",
                          }}
                          alt="image"
                        />
                        <Text isTruncated>{item.name}</Text>
                        {/* <FoodCard
                    {...{ ...item, onPress: () => onFoodPress(item.id) }}
                  /> */}
                      </Box>
                    </Box>
                  </Pressable>
                );
              }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.3}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="Quantity"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value ? String(value) : "0"}
                />
              )}
              name="quantity"
              rules={{ required: true }}
            />
          </Box>

          <Button onPress={handleLogUpdate}>Submit</Button>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
