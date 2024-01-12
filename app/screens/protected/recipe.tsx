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

export const Recipe: React.FC<RecipeScreenProps> = ({ route }) => {
  const { recipeId } = route.params;

  const dispatch = useAppDispatch();

  const { setRecipeInfo } = recipeActions;

  const recipeSliceState = useSelector((state: IRootState) => state.recipe);

  const { recipe } = recipeSliceState;

  useEffect(() => {
    dispatch(getRecipeInfo(recipeId));

    return () => {
      dispatch(setRecipeInfo(null));
    };
  }, []);

  // TODO: Skeletons for this bizzz
  if (!recipe && recipeSliceState.loading) return <Spinner />;

  if (!recipe || recipeSliceState.error)
    return <Text>{recipeSliceState.error ?? "An error has ocurred."}</Text>;

  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
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
                key={`recipe_${name}_category_${type}`}
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
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
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
    </Box>
  );
};
