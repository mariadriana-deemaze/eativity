/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";

import { Actionsheet, Box, Button, Text, VStack } from "native-base";

import { DailyLogMealTypeSection } from "../../components/dailylog/section";

import { MealLog, MealType } from "../../types";
import { lightTheme as theme } from "../../theme";
import { useForm } from "react-hook-form";

export const DailyLog = () => {
  const [inAddLogFlow, setInAddLogFlow] = useState(false);

  const formInstance = useForm<MealLog>();

  const DUMMY_LOGS: Record<MealType, MealLog[]> = {
    [MealType.BREAKFAST]: [
      {
        id: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        quantity: 1,
        type: MealType.BREAKFAST,
        foodId: "1",
        name: "Gala Apples",
        description:
          "Per 99g - Calories: 51kcal | Fat: 0.17g | Carbs: 13.67g | Protein: 0.26g",
        calories: 51,
        carbohydrates: 13.67,
        proteins: 0.26,
        fats: 0.17,
        servingSize: 99,
        image:
          "https://m.ftscrt.com/food/0d4503b2-1e1f-4322-8efc-5fcdc34686f0.jpg",
        barcode: "12",
      },
    ],
    [MealType.LUNCH]: [
      {
        id: "2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        quantity: 1,
        type: MealType.LUNCH,
        foodId: "1",
        name: "Carrot",
        description:
          "Per 99g - Calories: 51kcal | Fat: 0.17g | Carbs: 13.67g | Protein: 0.26g",
        calories: 51,
        carbohydrates: 13.67,
        proteins: 0.26,
        fats: 0.17,
        servingSize: 99,
        image:
          "https://m.ftscrt.com/food/0d4503b2-1e1f-4322-8efc-5fcdc34686f0.jpg",
        barcode: "123",
      },
      {
        id: "3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        quantity: 1,
        type: MealType.LUNCH,
        foodId: "1",
        name: "Yougurt",
        description:
          "Per 99g - Calories: 51kcal | Fat: 0.17g | Carbs: 13.67g | Protein: 0.26g",
        calories: 51,
        carbohydrates: 13.67,
        proteins: 0.26,
        fats: 0.17,
        servingSize: 99,
        image:
          "https://m.ftscrt.com/food/0d4503b2-1e1f-4322-8efc-5fcdc34686f0.jpg",
        barcode: "14",
      },
    ],
    [MealType.DINNER]: [],
    [MealType.SNACK]: [],
  };

  const handleLogUpdate = () => {
    // TODO: Dispatch reduced updated daily logs to store
  };

  return (
    <VStack
      width="100%"
      borderWidth={1}
      borderColor="amber.800"
      space={2}
      px="4"
      minHeight="100%"
      backgroundColor={theme.background.primary}
      pt="16"
    >
      {Object.entries(DUMMY_LOGS).map(
        ([key, value]) =>
          value.length > 0 && (
            <DailyLogMealTypeSection
              title={key as MealType}
              data={value}
              onAdd={() => setInAddLogFlow(true)}
            />
          )
      )}

      <Actionsheet isOpen={inAddLogFlow} onClose={() => setInAddLogFlow(false)}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text>Albums</Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>

          <Button onPress={handleLogUpdate}>Submit</Button>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};
