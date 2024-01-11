import { useEffect, useState } from "react";

import { FlatList, ScrollView } from "native-base";

import {
  MenuPills,
  MenuPillsSkeleton,
} from "../../components/menu-pills/menu-pills";

import { RecipeCard, RecipeCardSkeleton } from "../../components/recipes";

import { categories, recipe } from "../../utils";

export const Recipes = () => {
  const [isLoaded, setLoaded] = useState(false);

  const onRecipeCategoryPress = () => {
    // Search by category
    // fetch recipe/:id
  };

  const onRecipePress = () => {
    // Go to recipe page
    // simple navigation
  };

  return (
    <ScrollView>
      {isLoaded ? (
        <FlatList
          keyExtractor={(_item, index) => `category_${index}`}
          data={categories}
          horizontal
          scrollEnabled
          overScrollMode="always"
          renderItem={({ item, index }) => (
            <MenuPills title={item} isActive={index === 0} />
          )}
        />
      ) : (
        <FlatList
          keyExtractor={(_item, index) => `category_${index}`}
          data={new Array().fill(8)}
          horizontal
          scrollEnabled
          overScrollMode="always"
          renderItem={() => <MenuPillsSkeleton />}
        />
      )}

      {isLoaded ? (
        <FlatList
          data={recipe}
          renderItem={({ item }) => <RecipeCard {...item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={new Array().fill(8)}
          renderItem={(_item) => <RecipeCardSkeleton />}
          keyExtractor={(item, index) => `recipe_skeleton_${index}`}
        />
      )}
    </ScrollView>
  );
};
