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

import { Controller, useForm } from "react-hook-form";

import { TextField } from "../../components/atoms/textField";

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
  const { log, loading } = useSelector((state: IRootState) => state.dailylog);

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
    <VStack>
      <VStack pt="16" px="4" backgroundColor={theme.background.primary}>
        <Text>{totalSums.calories}</Text>
        <Text>{totalSums.fats}</Text>
        <Text>{totalSums.proteins}</Text>
        <Text>{totalSums.carbohydrates}</Text>
      </VStack>
      <ScrollView>
        <VStack
          px="4"
          width="100%"
          borderWidth={1}
          borderColor="amber.800"
          space={2}
          backgroundColor={theme.background.primary}
        >
          {loading ? (
            <Spinner />
          ) : (
            Object.entries(log).map(
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
            )
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
};
