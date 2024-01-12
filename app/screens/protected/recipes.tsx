import { useState } from "react";

import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import {
  Box,
  FlatList,
  Heading,
  Icon,
  Input,
  ScrollView,
  View,
  VStack,
} from "native-base";

import {
  MenuPills,
  MenuPillsSkeleton,
} from "../../components/menu-pills/menu-pills";

import { StackNavigationProp } from "@react-navigation/stack";

import { RouteProp } from "@react-navigation/native";

import { RecipeCard, RecipeCardSkeleton } from "../../components/recipes";

import { RoutesParamList } from "../../routes/protected";

import { MaterialIcons } from "@expo/vector-icons";

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
      // TODO: handle fetch by search term (since the FS API only searches by name)
    } else {
      // TODO: handle fetch by search term (since the FS API only searches by name)
    }
  };

  const onRecipePress = (id: string) => {
    navigation.navigate("Recipe", {
      recipeId: id,
    });
  };

  const onRecipesSearch = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    // TODO: handle fetch by search term
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
      <Box>
        <VStack w="100%" space={5} alignSelf="center">
          <Heading fontSize="lg">Search</Heading>
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
            onChange={onRecipesSearch}
          />
        </VStack>
      </Box>

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
