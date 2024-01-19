import React, { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";

import { Button, VStack } from "native-base";

import { TextField } from "../atoms/textField";

import { createNewFood, updateFoodInfo } from "../../stores/food/actions";

import { useAppDispatch } from "../../stores";

import { Food } from "../../types";
import { newFoodDummy } from "../../utils";

const FoodForm = ({ food }: { food?: Food }) => {
  const editMode = useMemo(() => !!food, [food]);

  const formInstance = useForm<Food>({
    defaultValues: food || newFoodDummy,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = formInstance;

  const dispatch = useAppDispatch();

  const onSubmit = (foodData: Food) => {
    if (editMode) {
      dispatch(updateFoodInfo(foodData));
    } else {
      dispatch(createNewFood(foodData));
    }
  };

  return (
    <VStack
      space="4"
      flex="1"
      alignItems="center"
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        letterSpacing: "lg",
      }}
      bg="white"
      paddingY="2"
      px="5"
    >
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Name"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Description"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            numberOfLines={3}
          />
        )}
        name="description"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Calories"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value ? String(value) : undefined}
          />
        )}
        name="calories"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Carbohydrates"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value ? String(value) : undefined}
          />
        )}
        name="carbohydrates"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Fats"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value ? String(value) : undefined}
          />
        )}
        name="fats"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Proteins"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value ? String(value) : undefined}
          />
        )}
        name="proteins"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Portion(g)"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value ? String(value) : undefined}
          />
        )}
        name="servingSize"
        rules={{ required: true }}
      />
      {/* ADD HERE CAMERA FUNCTIONALITY */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Barcode"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value ? String(value) : undefined}
          />
        )}
        name="barcode"
      />

      {/* ADD HERE CAMERA FUNCTIONALITY */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label="Image"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value ? String(value) : undefined}
          />
        )}
        name="image"
      />
      <Button
        size="sm"
        colorScheme="green"
        onPress={handleSubmit(onSubmit)}
        isDisabled={!isDirty}
      >
        SAVE
      </Button>
    </VStack>
  );
};

export default FoodForm;
