export enum IntegratedFatSecretMethods {
    FOODS_SEARCH = "foods.search",
    FOOD_GET = "food.get",
    RECIPES_SEARCH = "recipes.search",
    RECIPE_GET = "recipe.get",
    RECIPE_TYPES = "recipe_types.get.v2",
  }
  
  export type FatSecretApiTokenResponse = {
    access_token: string;
    expires_in: number;
    token_type: "Bearer";
    scope: "basic" | "premier" | "barcode" | "localization";
  };
  
  export type FatSecretFood = {
    brand_name: string;
    food_description: string;
    food_id: string;
    food_name: string;
    food_type: string;
    food_url: string;
  };
  
  export type FatSecretRecipe = {
    recipe_description: string;
    recipe_id: string;
    recipe_image: string;
    recipe_ingredients: {
      ingredient: string[];
    };
    recipe_name: string;
    recipe_nutrition: {
      calories: string;
      carbohydrate: string;
      fat: string;
      protein: string;
    };
    recipe_types: {
      recipe_type: FatSecretRecipeTypes;
    };
  };
  
  export type FatSecretRecipeTypes = { recipe_types: { recipe_type: string[] } };
  
  export type FatSecretPaginatedParams = {
    max_results: string;
    page_number: string;
    total_results: string;
  };
  
  export type FatSecretFoodsPage = {
    foods: { food: FatSecretFood[] };
  } & FatSecretPaginatedParams;
  
  export type FatSecretRecipesPage = {
    recipes: { recipe: FatSecretRecipe[] };
  } & FatSecretPaginatedParams;
