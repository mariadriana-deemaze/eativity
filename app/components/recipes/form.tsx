import { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";

import { Button, VStack, useToast } from "native-base";

import { TextField } from "../atoms/textField";

import { createNewRecipe, updateRecipeInfo } from "../../stores/recipe/actions";

import { useAppDispatch } from "../../stores";

import { PatchRecipe, PostRecipe, Recipe } from "../../types";

import { newRecipeDummy } from "../../utils";

import { ImageUploader } from "../atoms/imageUploader";

import { recipeActions } from "../../stores/recipe/slices";

import { ToastAlert } from "../toastAlert";

const RecipeForm = ({ recipe }: { recipe?: Recipe }) => {
  const editMode = useMemo(() => !!recipe, [recipe]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<PatchRecipe | PostRecipe>({
    defaultValues: { ...recipe, image: recipe?.image?.path } || newRecipeDummy,
  });

  const dispatch = useAppDispatch();

  const toast = useToast();

  const onSubmit = (recipeData: PatchRecipe | PostRecipe) => {
    if (editMode) {
      dispatch(updateRecipeInfo({ id: recipe.id, recipe: recipeData }))
        .then(({ payload }) => {
          return dispatch(recipeActions.setRecipeInfo(payload as Recipe));
        })
        .catch((err) => {
          return toast.show({
            id: "updateRecipeError",
            render: () => {
              return (
                <ToastAlert
                  title="Error!"
                  description={JSON.stringify(err)}
                  status="error"
                  onClose={() => toast.close("updateRecipeError")}
                />
              );
            },
          });
        });
    } else {
      dispatch(createNewRecipe({ recipe: recipeData }));
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

      <ImageUploader
        folder={`recipe`}
        onChange={(url: string | null) => {
          setValue("image", url, { shouldDirty: true });
        }}
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

export default RecipeForm;
