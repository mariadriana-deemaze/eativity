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

import {
  MenuPills,
  MenuPillsSkeleton,
} from "../../components/menu-pills/menu-pills";

import { StackNavigationProp } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { RecipeCard, RecipeCardSkeleton } from "../../components/recipes";

import { RoutesParamList } from "../../routes/navigation";

import { MaterialIcons } from "@expo/vector-icons";

import { categories } from "../../utils";

import { IRootState, useAppDispatch } from "../../stores";

import { recipeActions } from "../../stores/recipe/slices";

import { getRecipesFromSearch } from "../../stores/recipe/actions";

import { Screens } from "../../routes/navigation";

import { PaginationParameters } from "../../types";

type RecipeScreenNavigationProp = StackNavigationProp<
  RoutesParamList,
  "Recipes"
>;

type RecipeScreenRouteProp = RouteProp<RoutesParamList, "Recipes">;

type RecipesScreenProps = {
  navigation: RecipeScreenNavigationProp;
  route: RecipeScreenRouteProp;
};

const DEFAULT_PAGINATION: PaginationParameters = {
  maxResults: 5,
  offset: 0,
};

export const Recipes: React.FC<RecipesScreenProps> = ({ navigation }) => {
  const {
    loading: isLoading,
    category: selectedCategory,
    search,
    recipes,
  } = useSelector((state: IRootState) => state.recipe);

  const dispatch = useAppDispatch();

  const onRecipeCategoryPress = (category: string) =>
    dispatch(recipeActions.setCategory(category));

  const onRecipePress = (id: string) => {
    navigation.navigate(Screens.RECIPE, {
      recipeId: id,
    });
  };

  const onRecipesSearch = (text: string) =>
    dispatch(recipeActions.setSearch(text));

  const hasRecipesData = recipes?.data.length > 0;

  const loadMoreRecipes = () => {
    if (recipes.data.length < recipes.pagination.count) {
      dispatch(
        getRecipesFromSearch({
          pagination: {
            maxResults: recipes.pagination.maxResults,
            offset: recipes.pagination.offset + DEFAULT_PAGINATION.maxResults,
          },
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getRecipesFromSearch({
        search,
        pagination: DEFAULT_PAGINATION,
      })
    );
  }, [search]);

  const pillsFlatListStyles = {
    horizontal: true,
    scrollEnabled: true,
    overScrollMode: "always",
    height: "16",
    px: "3",
    contentContainerStyle: {
      display: "flex",
      alignItems: "center",
    },
  } as const;

  return (
    <Box alignItems="center">
      <Box maxW="80" mt="5">
        <Input
          placeholder="Search for recipes"
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
          onChangeText={onRecipesSearch}
        />
      </Box>

      <Box h="12">
        {categories ? (
          <FlatList
            keyExtractor={(item) => `category_${item}`}
            data={["All", ...categories]}
            {...pillsFlatListStyles}
            renderItem={({ item: category }) => (
              <MenuPills
                title={category}
                isActive={selectedCategory === category}
                onPress={() => onRecipeCategoryPress(category)}
              />
            )}
          />
        ) : (
          <FlatList
            keyExtractor={(_item, index) => `category_${index}`}
            data={new Array(8).fill(1)}
            {...pillsFlatListStyles}
            renderItem={() => <MenuPillsSkeleton />}
          />
        )}
      </Box>

      <Box maxW="80" my="2">
        <HStack
          space="2"
          w="80"
          alignItems="center"
          justifyContent="space-between"
        >
          {hasRecipesData ? (
            <>
              <Text fontSize="xs">
                Matched {recipes?.pagination?.count} results.
              </Text>
              <Text fontSize="xs">
                Displaying {recipes?.data.length} results.
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
      {isLoading && !hasRecipesData && (
        <FlatList
          keyExtractor={(_item, index) => `recipe_skeleton_${index}`}
          data={new Array(8).fill(1)}
          renderItem={() => <RecipeCardSkeleton />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}

      <Box h="container" marginBottom="56" alignItems="center">
        {/* RESULTS */}
        {!isLoading && hasRecipesData && (
          <FlatList
            keyExtractor={(item) => item.id}
            data={recipes?.data}
            renderItem={({ item }) => (
              <RecipeCard
                {...{ ...item, onPress: () => onRecipePress(item.id) }}
              />
            )}
            onEndReached={loadMoreRecipes}
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
            hasRecipesData &&
            recipes.data.length === recipes.pagination.count && (
              <Text>End of results.</Text>
            )}

          {/* FETCHING MORE */}
          {isLoading && <Spinner />}

          {/* QUERY RETURN NO MATCHING RESULTS */}
          {!isLoading && !hasRecipesData && (
            <Text>No matching results for "{search}" term.</Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
