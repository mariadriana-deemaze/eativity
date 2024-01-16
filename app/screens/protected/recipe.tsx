import { useEffect } from "react";

import { StackNavigationProp } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";

import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "native-base";

import { useSelector } from "react-redux";

import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { IRootState, useAppDispatch } from "../../stores";

import { getRecipeInfo } from "../../stores/recipe/actions";

import { recipeActions } from "../../stores/recipe/slices";

import { RoutesParamList } from "../../routes/protected";

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
  const { recipeId } = route.params;

  const dispatch = useAppDispatch();

  const { setRecipeInfo } = recipeActions;

  const { recipe, loading, error } = useSelector(
    (state: IRootState) => state.recipe
  );

  const navigateBack = () => navigation.goBack();

  useEffect(() => {
    dispatch(getRecipeInfo(recipeId));

    return () => {
      dispatch(setRecipeInfo(null));
    };
  }, []);

  // TODO: Skeletons for this bizzz
  if (!recipe && loading) return <Spinner />;

  if (recipe)
    return (
      <Box alignItems="center">
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
          <Box position="absolute" top="8" left="4">
            <TouchableOpacity onPress={navigateBack}>
              <Ionicons name="arrow-back-outline" size={32} color="white" />
            </TouchableOpacity>
          </Box>
          <Center
            bg="green.500"
            _dark={{
              bg: "green.400",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
            display="flex"
            flexDirection="row"
          >
            {recipe?.types.map((type) => (
              <Text
                key={`recipe_${recipe.name}_category_${type}`}
                color="warmGray.50"
                fontWeight="700"
                fontSize="xs"
              >
                {type}
              </Text>
            ))}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {recipe.name}
            </Heading>
            {/* <Text
              fontSize="xs"
              _light={{
                color: "green.500",
              }}
              _dark={{
                color: "green.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
             Some aditional test here - let's see
            </Text> */}
          </Stack>
          <Text fontWeight="400" noOfLines={3}>
            {recipe.description}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                6 mins ago{" "}
                {/*
                 * TODO: Created_at here
                 */}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    );

  if (!recipe && error)
    return <Text>{error.message ?? "An error has ocurred."}</Text>;
};
