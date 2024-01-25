/*
  Warnings:

  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodToMeal` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MealLogType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_userMealId_fkey";

-- DropForeignKey
ALTER TABLE "UserMeal" DROP CONSTRAINT "UserMeal_userId_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToMeal" DROP CONSTRAINT "_FoodToMeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToMeal" DROP CONSTRAINT "_FoodToMeal_B_fkey";

-- DropTable
DROP TABLE "Meal";

-- DropTable
DROP TABLE "UserMeal";

-- DropTable
DROP TABLE "_FoodToMeal";

-- CreateTable
CREATE TABLE "MealLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MealLogType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "foodId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MealLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealLog" ADD CONSTRAINT "MealLog_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealLog" ADD CONSTRAINT "MealLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
