/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useMemo, useState } from "react";

import {
  Actionsheet,
  Box,
  Button,
  FlatList,
  Image,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
  ScrollView,
} from "native-base";

import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import { DailyLogMealTypeSection } from "../../components/dailylog/section";

import {
  MealLog,
  MealType,
  PatchMealLogEntry,
  PostMealLogEntry,
} from "../../types";

import { lightTheme as theme } from "../../theme";

import { IRootState, useAppDispatch } from "../../stores";

import { getDailyLogs } from "../../stores/dailylog/actions";

export const DailyLog = () => {
  const { log } = useSelector((state: IRootState) => state.dailylog);

  const dispatch = useAppDispatch();

  const [inAddLogFlow, setInAddLogFlow] = useState<MealType | undefined>(
    undefined
  );

  const formInstance = useForm<PostMealLogEntry | PatchMealLogEntry>();

  const totalSums = useMemo(() => {
    let result = {
      fats: 0,
      calories: 0,
      carbohydrates: 0,
      proteins: 0,
      total: 0,
    };

    Object.values(log).forEach((logValue) => {
      logValue.forEach(
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
    });

    return result;
  }, [log]);

  useEffect(() => {
    dispatch(getDailyLogs());
  }, []);

  return (
    <VStack minHeight="100%">
      <VStack
        px="4"
        pt="12"
        pb="6"
        borderBottomWidth={1}
        borderBottomColor="gray.200"
        backgroundColor={theme.background.primary}
      >
        <Text
          fontFamily="PlusJakartaSans_600SemiBold"
          color={theme.text.paragraph.primary}
          fontSize="md"
          isTruncated
        >
          {totalSums.calories}
        </Text>
        <Text
          fontFamily="PlusJakartaSans_400Regular"
          color={theme.text.paragraph.primary}
          fontSize="sm"
          isTruncated
        >
          {totalSums.fats}
        </Text>
        <Text
          fontFamily="PlusJakartaSans_400Regular"
          color={theme.text.paragraph.primary}
          fontSize="sm"
          isTruncated
        >
          {totalSums.proteins}
        </Text>
        <Text
          fontFamily="PlusJakartaSans_400Regular"
          color={theme.text.paragraph.primary}
          fontSize="sm"
          isTruncated
        >
          {totalSums.carbohydrates}
        </Text>
      </VStack>

      <ScrollView>
        <VStack
          p="4"
          width="100%"
          space={2}
          backgroundColor={theme.background.primary}
        >
          {Object.entries(log).map(
            ([key, value]: [key: MealType, MealLog[]]) => (
              <DailyLogMealTypeSection
                key={`section_${key}`}
                title={key}
                data={value}
                formInstance={formInstance}
                inAddFlow={inAddLogFlow === key}
                setInAddLogFlow={setInAddLogFlow}
              />
            )
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
};
