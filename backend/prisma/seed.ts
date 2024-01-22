import { PrismaClient } from "@prisma/client";

import seedingUser from "./seedsData/users.json";

import seedingFoods from "./seedsData/foods.json";

import seedingRecipes from "./seedsData/recipes.json";

import seedingRecipeCategories from "./seedsData/recipeCategories.json";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: seedingUser,
  });

  const foods = await prisma.food.createMany({
    data: seedingFoods,
  });

  const recipes = await prisma.recipe.createMany({
    data: seedingRecipes,
  });

  const recipesCategories = await prisma.recipeCategory.createMany({
    data: seedingRecipeCategories,
  });

  /* 
  const recipesWithBroccoli = await prisma.recipe.findMany({
    where: {
      name: {
        contains: "Broccoli",
      },
    },
  });

  const foodBroccoli = await prisma.food.findFirst({
    where: {
      name: "Broccoli",
    },
  });

  console.log("recipesWithBroccoli ->", recipesWithBroccoli);
  console.log("foodBroccoli ->", foodBroccoli);

  const recipeIdsToUpdate = recipesWithBroccoli.map((recipe) => recipe.id);

  const foodIdToConnect = foodBroccoli.id;

  const updatedRecipes = await Promise.all(
    recipeIdsToUpdate.map(async (recipeId) => {
      return prisma.recipe.update({
        where: { id: recipeId },
        data: {
          foods: {
            connect: { id: foodIdToConnect },
          },
        },
      });
    })
  );
   console.log("updated updatedRecipes ->", updatedRecipes);
  */

  console.log("////////////////////////");
  console.log("created user ->", user);
  console.log("created foods ->", foods);
  console.log("created recipes ->", recipes);
  console.log("created recipe categories ->", recipesCategories);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
