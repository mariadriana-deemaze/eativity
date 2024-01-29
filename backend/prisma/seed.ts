import { MealLogType, Prisma, PrismaClient } from "@prisma/client";

import seedingRecipeCategories from "./seedsData/recipeCategories.json";

import { faker } from "@faker-js/faker";

import { hash } from "argon2";

import { sub } from "date-fns";

const prisma = new PrismaClient();

const createMainUser = async () => {
  const password_hash = await hash("123");

  const createdUser = await prisma.user.create({
    data: {
      name: "Maria Adriana",
      email: "m@gmail.com",
      password_hash,
    },
  });

  console.log(`/////////`);
  console.log("Created main user ->", createdUser);
  return createdUser;
};

const createOtherUsers = async (count: number = 2) => {
  const users = [];

  for (let index = 0; index <= count; index++) {
    const password_hash = await hash(faker.internet.password());

    const user: Prisma.UserCreateInput = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash,
    };

    users.push(user);
  }

  const createdUsers = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  console.log(`/////////`);
  console.log(`Created ${createdUsers.length} extra user records.`);
  console.log(createdUsers);
  return createdUsers;
};

const createManyFoods = async (count: number = 5) => {
  const foods = [];

  for (let index = 0; index < count; index++) {
    const food = {
      name: faker.lorem.lines(1),
      description: faker.lorem.paragraphs(3),
      calories: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      carbohydrates: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      proteins: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      fats: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      servingSize: faker.helpers.rangeToNumber({ min: 0, max: 6 }),
      image: faker.image.urlLoremFlickr({ category: "food" }),
      barcode: faker.commerce.isbn(),
    };

    foods.push(food);
  }

  const createdFoods = await Promise.all(
    foods.map((food) =>
      prisma.food.create({
        data: food,
      })
    )
  );

  console.log(`/////////`);
  console.log(`Created ${createdFoods.length} food records.`);
  console.log(createdFoods);
  return createdFoods;
};

const createManyRecipes = async (count: number = 5) => {
  const recipes = [];

  for (let index = 0; index < count; index++) {
    const recipe = {
      name: faker.lorem.lines(1),
      description: faker.lorem.paragraphs(3),
      calories: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      carbohydrates: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      proteins: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      fats: faker.helpers.rangeToNumber({ min: 0, max: 400 }),
      image: faker.image.urlLoremFlickr({ category: "food" }),
    };

    recipes.push(recipe);
  }

  const createdRecipes = await Promise.all(
    recipes.map((recipe) =>
      prisma.recipe.create({
        data: recipe,
      })
    )
  );

  console.log(`/////////`);
  console.log(`Created ${createdRecipes.length} recipe records.`);
  console.log(createdRecipes);
  return createdRecipes;
};

const createManyRecipesCategories = async () => {
  const recipeCategories = await Promise.all(
    seedingRecipeCategories.map((recipeCategory) =>
      prisma.recipeCategory.create({
        data: recipeCategory,
      })
    )
  );

  console.log(`/////////`);
  console.log(`Created ${recipeCategories.length} recipe categories records.`);
  console.log(recipeCategories);
  return recipeCategories;
};

const createSomeRecipeToFoodRelations = async (
  relations: { foodId: number; recipeId: number }[]
) => {
  const createdRelations = await Promise.all(
    relations.map((relation) =>
      prisma.foodRecipe.create({
        data: {
          food: {
            connect: {
              id: relation.foodId,
            },
          },
          recipe: {
            connect: {
              id: relation.recipeId,
            },
          },
        },
      })
    )
  );

  console.log(`/////////`);
  console.log(`Created foods to recipes records.`);
  console.log(createdRelations);
  return createdRelations;
};

const createManyFoodLogs = async (
  relations: { userId: number; foodId: number }[]
) => {
  const today = new Date();
  const sevenDaysAgo = sub(today, { days: 7 });

  const createdLogs = await Promise.all(
    relations.map((relation, index) => {
      const date =
        index === 0
          ? today
          : faker.date.between({
              from: sevenDaysAgo.toISOString(),
              to: today.toISOString(),
            });

      return prisma.mealLog.create({
        data: {
          user: {
            connect: {
              id: relation.userId,
            },
          },
          food: {
            connect: {
              id: relation.foodId,
            },
          },
          type: MealLogType.LUNCH,
          quantity: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
          createdAt: date,
          updatedAt: date,
        },
      });
    })
  );

  console.log(`/////////`);
  console.log(`Created ${createdLogs.length} logs records.`);
  console.log(createdLogs);
  return createdLogs;
};

async function seed() {
  const createdMainUser = await createMainUser();

  const createdUsers = await createOtherUsers(3);

  const createdFoods = await createManyFoods(10);

  const createdRecipes = await createManyRecipes(10);

  await createManyRecipesCategories();

  await createSomeRecipeToFoodRelations([
    {
      foodId: createdFoods[0].id,
      recipeId: createdRecipes[0].id,
    },
    {
      foodId: createdFoods[1].id,
      recipeId: createdRecipes[0].id,
    },
    {
      foodId: createdFoods[2].id,
      recipeId: createdRecipes[0].id,
    },
    {
      foodId: createdFoods[6].id,
      recipeId: createdRecipes[3].id,
    },
  ]);

  await createManyFoodLogs([
    {
      foodId: createdFoods[0].id,
      userId: createdMainUser.id,
    },
    {
      foodId: createdFoods[1].id,
      userId: createdMainUser.id,
    },
    {
      foodId: createdFoods[2].id,
      userId: createdMainUser.id,
    },
    {
      foodId: createdFoods[0].id,
      userId: createdUsers[0].id,
    },
    {
      foodId: createdFoods[1].id,
      userId: createdUsers[0].id,
    },
    {
      foodId: createdFoods[2].id,
      userId: createdUsers[0].id,
    },
    {
      foodId: createdFoods[6].id,
      userId: createdUsers[3].id,
    },
  ]);
}
seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
