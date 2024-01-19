import { useEffect } from "react";

import {
  Box,
  FlatList,
  HStack,
  Icon,
  Input,
  Skeleton,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";

import { StackNavigationProp } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { FoodCard, FoodCardSkeleton } from "../../components/foods";

import { RoutesParamList } from "../../routes/navigation";

import { MaterialIcons } from "@expo/vector-icons";

import { IRootState, useAppDispatch } from "../../stores";

import { foodActions } from "../../stores/food/slices";

import { getFoodsFromSearch } from "../../stores/food/actions";

import { Screens } from "../../routes/navigation";

import { PaginationParameters } from "../../types";

type FoodScreenNavigationProp = StackNavigationProp<RoutesParamList, "Foods">;

type FoodScreenRouteProp = RouteProp<RoutesParamList, "Foods">;

type FoodsScreenProps = {
  navigation: FoodScreenNavigationProp;
  route: FoodScreenRouteProp;
};

const DEFAULT_PAGINATION: PaginationParameters = {
  maxResults: 5,
  offset: 0,
};

export const Foods: React.FC<FoodsScreenProps> = ({ navigation }) => {
  const {
    loading: isLoading,
    foods,
    search,
  } = useSelector((state: IRootState) => state.food);

  const dispatch = useAppDispatch();

  const hasFoodData = foods?.data.length > 0;

  const onFoodPress = (id: string) => {
    navigation.navigate(Screens.FOOD, {
      foodId: id,
    });
  };

  const onFoodsSearch = (text: string) => dispatch(foodActions.setSearch(text));

  const loadMoreFoods = () => {
    if (foods.data.length < foods.pagination.count) {
      dispatch(
        getFoodsFromSearch({
          pagination: {
            maxResults: foods.pagination.maxResults,
            offset: foods.pagination.offset + DEFAULT_PAGINATION.maxResults,
          },
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getFoodsFromSearch({
        search,
        pagination: DEFAULT_PAGINATION,
      })
    );
  }, [search]);

  return (
    <Box alignItems="center">
      <Box maxW="80" mt="5">
        <Input
          placeholder="Search for foods"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          value={search}
          onChangeText={onFoodsSearch}
        />
      </Box>

      <Box maxW="80" my="2">
        <HStack
          space="2"
          w="80"
          alignItems="center"
          justifyContent="space-between"
        >
          {hasFoodData ? (
            <>
              <Text fontSize="xs">
                Matched {foods?.pagination?.count} results.
              </Text>
              <Text fontSize="xs">
                Displaying {foods?.data.length} results.
              </Text>
            </>
          ) : (
            <>
              <Skeleton
                height="5"
                width="1/2"
                rounded="md"
                bgColor="gray.100"
              />
              <Skeleton
                height="5"
                width="1/2"
                rounded="md"
                bgColor="gray.100"
              />
            </>
          )}
        </HStack>
      </Box>

      {/* SKELETON */}
      {isLoading && !hasFoodData && (
        <FlatList
          keyExtractor={(_item, index) => `food_skeleton_${index}`}
          data={new Array(8).fill(1)}
          renderItem={() => <FoodCardSkeleton />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}

      <Box h="container" marginBottom="56" alignItems="center">
        {/* RESULTS */}
        {!isLoading && hasFoodData && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={foods?.data}
            renderItem={({ item }) => (
              <FoodCard {...{ ...item, onPress: () => onFoodPress(item.id) }} />
            )}
            onEndReached={loadMoreFoods}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}

        <VStack
          space="2"
          py="5"
          w="80"
          alignItems="center"
          /* h="full"
          justifyContent="center" */
        >
          {/* END OF RESULTS */}
          {!isLoading &&
            hasFoodData &&
            foods.data.length === foods.pagination.count && (
              <Text>End of results.</Text>
            )}

          {/* FETCHING MORE */}
          {isLoading && <Spinner />}

          {/* QUERY RETURN NO MATCHING RESULTS */}
          {!isLoading && !hasFoodData && (
            <Text>No matching results for "{search}" term.</Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
