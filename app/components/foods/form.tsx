import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Food } from "../../types";
import { Button, VStack } from "native-base";
import { TextField } from "../atoms/textField";

const FoodForm = ({ food }: { food: Food }) => {
  const formInstance = useForm<Food>({
    defaultValues: {
      ...food,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = formInstance;

  const onSubmit = (data: Food) => {
    console.log("updated food ->", data);
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
            label="E-mail"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
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
            value={String(value)}
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
            value={String(value)}
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
            value={String(value)}
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
            value={String(value)}
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
            value={String(value)}
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
            value={String(value)}
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
            value={String(value)}
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
