import { Box, FlatList, Icon, Input, ScrollView, View } from "native-base";

import {
  MenuPills,
  MenuPillsSkeleton,
} from "../../components/menu-pills/menu-pills";

import { StackNavigationProp } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";

import { useSelector } from "react-redux";

import { RecipeCard, RecipeCardSkeleton } from "../../components/recipes";

import { RoutesParamList } from "../../routes/protected";

import { MaterialIcons } from "@expo/vector-icons";

import { categories, recipe } from "../../utils";

import { IRootState, useAppDispatch } from "../../stores";

import { recipeActions } from "../../stores/recipe/slices";

import { Screens } from "../../routes/navigation";

type RecipeScreenNavigationProp = StackNavigationProp<
  RoutesParamList,
  "Recipes"
>;

type RecipeScreenRouteProp = RouteProp<RoutesParamList, "Recipes">;

type RecipesScreenProps = {
  navigation: RecipeScreenNavigationProp;
  route: RecipeScreenRouteProp;
};

export const Recipes: React.FC<RecipesScreenProps> = ({ navigation }) => {
  const {
    loading: isLoading,
    category: selectedCategory,
    search,
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
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
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

      {!isLoading ? (
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

      {!isLoading ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={recipe}
          renderItem={({ item }) => (
            <RecipeCard
              {...{ ...item, onPress: () => onRecipePress(item.id) }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      ) : (
        <FlatList
          keyExtractor={(_item, index) => `recipe_skeleton_${index}`}
          data={new Array(8).fill(1)}
          renderItem={() => <RecipeCardSkeleton />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </ScrollView>
  );
};
