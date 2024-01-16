import { PrismaClient } from "@prisma/client";

import seedingUsers from "./seedsData/users.json";

import seedingFoods from "./seedsData/foods.json";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: seedingUsers,
  });

  const foods = await prisma.food.createMany({
    data: seedingFoods,
  });

  console.log("////////////////////////");
  console.log("created user ->", user);
  console.log("created foods ->", foods);
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
