import React, { useMemo } from "react";

import { View, Text, Divider, HStack, Button, VStack } from "native-base";

import { MealLog, MealType } from "../../types";

import { lightTheme as theme } from "../../theme";
import { pluralize } from "../../utils";

export const DailyLogMealTypeSection = ({
  title,
  data,
  onAdd,
}: {
  title: MealType;
  data: MealLog[];
  onAdd: () => void;
}) => {
  const dataSum = useMemo(() => {
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
          fats: result.fats + log.fats,
          carbohydrates: result.carbohydrates + log.carbohydrates,
          proteins: result.proteins + log.proteins,
          calories: result.calories + log.calories,
          total: result.total + log.quantity,
        })
    );

    return result;
  }, [data]);

  return (
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
          {dataSum.total} {pluralize(dataSum.total, "item")}
        </Text>
      </HStack>

      <Divider />

      <VStack width="100%" space="2" alignItems="center" px="2" py="3">
        {data.map((log) => (
          <VStack
            key={log.id}
            width="100%"
            py="3"
            px="2"
            backgroundColor={theme.background.secondary}
          >
            <Text>
              {log.quantity}x {log.name}
            </Text>
            <HStack>
              <Text>{log.calories}</Text>

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
                  {log.fats} {pluralize(log.fats, "fat")}
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
                  {log.proteins} {pluralize(log.proteins, "protein")}
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
                  {log.carbohydrates} {pluralize(log.carbohydrates, "carb")}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        ))}
      </VStack>

      <Divider />

      <HStack space="2" alignItems="center" px="2" py="3">
        <Button onPress={onAdd} colorScheme="green">
          Add food
        </Button>
        <Text>You are totalling {dataSum.calories} kcal.</Text>
      </HStack>
    </View>
  );
};
