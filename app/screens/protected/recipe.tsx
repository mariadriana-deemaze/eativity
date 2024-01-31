import { useEffect, useState } from "react";

import { format } from "date-fns";

import { StackNavigationProp } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";

import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Image,
  ScrollView,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "native-base";

import { useSelector } from "react-redux";

import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { IRootState, useAppDispatch } from "../../stores";

import { getRecipeInfo } from "../../stores/recipe/actions";

import { recipeActions } from "../../stores/recipe/slices";

import { RoutesParamList } from "../../routes/navigation";

import RecipeForm from "../../components/recipes/form";

type RecipeScreenNavigationProp = StackNavigationProp<
  RoutesParamList,
  "Recipe"
>;

type RecipeScreenRouteProp = RouteProp<RoutesParamList, "Recipe">;

type RecipeScreenProps = {
  navigation: RecipeScreenNavigationProp;
  route: RecipeScreenRouteProp;
};

export const Recipe: React.FC<RecipeScreenProps> = ({ route, navigation }) => {
  const [onEditMode, setEditMode] = useState<"create" | "edit" | undefined>(
    undefined
  );

  const { recipeId } = route.params;

  const dispatch = useAppDispatch();

  const { setRecipeInfo } = recipeActions;

  const { recipe, loading, error } = useSelector(
    (state: IRootState) => state.recipe
  );

  const navigateBack = () => navigation.goBack();

  const enterEditRecord = () => {
    onEditMode === "edit" ? setEditMode(undefined) : setEditMode("edit");
  };

  const enterNewRecord = () => {
    onEditMode === "create" ? setEditMode(undefined) : setEditMode("create");
  };

  useEffect(() => {
    dispatch(getRecipeInfo(recipeId));

    return () => {
      dispatch(setRecipeInfo(null));
    };
  }, []);

  if (loading)
    return (
      <Box h="full" w="container" alignContent="center">
        <Skeleton height="64" width="full" rounded="md" bgColor="gray.100" />
        <VStack space="4" mt="8" px="8">
          <Skeleton height="5" width="5/6" rounded="md" bgColor="gray.100" />
          <Skeleton height="5" width="full" rounded="md" bgColor="gray.100" />
        </VStack>
      </Box>
    );

  if (recipe)
    return (
      <>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri:
                  recipe.image?.path ||
                  "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
          <Box position="absolute" top="8" left="4">
            <TouchableOpacity onPress={navigateBack}>
              <Ionicons name="arrow-back-outline" size={32} color="white" />
            </TouchableOpacity>
          </Box>
          {(onEditMode === undefined || onEditMode === "edit") && (
            <Box position="absolute" top="8" right="16">
              <TouchableOpacity onPress={enterEditRecord}>
                <Ionicons name="settings-outline" size={32} color="white" />
              </TouchableOpacity>
            </Box>
          )}
          {(onEditMode === undefined || onEditMode === "create") && (
            <Box position="absolute" top="8" right="4">
              <TouchableOpacity onPress={enterNewRecord}>
                <Ionicons name="document-outline" size={32} color="white" />
              </TouchableOpacity>
            </Box>
          )}
        </Box>

        <ScrollView w="full">
          {onEditMode === "edit" && <RecipeForm recipe={recipe} />}

          {onEditMode === "create" && <RecipeForm />}

          {onEditMode === undefined && (
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {recipe.name}
                </Heading>
              </Stack>
              <Text fontWeight="400" noOfLines={3}>
                {recipe.description}
              </Text>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    {format(new Date(recipe.createdAt), "MM/dd/yyyy")}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    {format(new Date(recipe.updatedAt), "MM/dd/yyyy")}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          )}
        </ScrollView>
      </>
    );

  if (!recipe && error)
    return <Text>{error.message ?? "An error has ocurred."}</Text>;
};
