import { useState } from "react";

import { FlatList, ScrollView, View } from "native-base";

import {
  MenuPills,
  MenuPillsSkeleton,
} from "../../components/menu-pills/menu-pills";

import { StackNavigationProp } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";

import { RecipeCard, RecipeCardSkeleton } from "../../components/recipes";

import { RoutesParamList } from "../../routes/protected";

import { categories, recipe } from "../../utils";

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
  const [isLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<undefined | string>(
    undefined
  );

  const onRecipeCategoryPress = (category: string) => {
    setSelectedCategory(category);

    if (category === "All") {
      // TODO: handle fetch
    } else {
      // TODO: handle fetch
    }
  };

  const onRecipePress = (id: string) => {
    navigation.navigate("Recipe", {
      recipeId: id,
    });
  };

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
    <ScrollView>
      {isLoaded ? (
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

      {isLoaded ? (
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
