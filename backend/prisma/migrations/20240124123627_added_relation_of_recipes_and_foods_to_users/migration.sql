-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
