/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Media_path_key" ON "Media"("path");
