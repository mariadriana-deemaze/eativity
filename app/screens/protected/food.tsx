import { useEffect, useState } from "react";

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
} from "@gluestack-ui/themed";

import { useSelector } from "react-redux";

import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { IRootState, useAppDispatch } from "../../stores";

import { getFoodInfo } from "../../stores/food/actions";

import { foodActions } from "../../stores/food/slices";

import { RoutesParamList } from "../../routes/navigation";

import FoodForm from "../../components/foods/form";

import { format } from "date-fns";

type FoodScreenNavigationProp = StackNavigationProp<RoutesParamList, "Food">;

type FoodScreenRouteProp = RouteProp<RoutesParamList, "Food">;

type FoodScreenProps = {
  navigation: FoodScreenNavigationProp;
  route: FoodScreenRouteProp;
};

export const Food: React.FC<FoodScreenProps> = ({ route, navigation }) => {
  const [onEditMode, setOnEditMode] = useState<"create" | "edit" | undefined>(
    undefined
  );

  const { foodId } = route.params;

  const dispatch = useAppDispatch();

  const { setFoodInfo } = foodActions;

  const { food, loading, error } = useSelector(
    (state: IRootState) => state.food
  );

  const navigateBack = () => navigation.goBack();

  const enterEditRecord = () => {
    onEditMode === "edit" ? setOnEditMode(undefined) : setOnEditMode("create");
  };

  const enterNewRecord = () => {
    onEditMode === "create"
      ? setOnEditMode(undefined)
      : setOnEditMode("create");
  };

  useEffect(() => {
    dispatch(getFoodInfo(foodId));

    return () => {
      dispatch(setFoodInfo(null));
    };
  }, [foodId]);

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

  if (food)
    return (
      <>
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
          {onEditMode === "edit" && <FoodForm food={food} />}

          {onEditMode === "create" && <FoodForm />}

          {onEditMode === undefined && (
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {food.name}
                </Heading>
              </Stack>
              <Text fontWeight="400" noOfLines={3}>
                {food.description}
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
                    {format(new Date(food.createdAt), "MM/dd/yyyy")}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    {format(new Date(food.updatedAt), "MM/dd/yyyy")}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          )}
        </ScrollView>
      </>
    );

  if (!food && error)
    return <Text>{error.message ?? "An error has ocurred."}</Text>;
};
