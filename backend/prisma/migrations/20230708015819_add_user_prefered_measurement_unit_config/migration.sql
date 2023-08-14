-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('IMPERIAL', 'METRIC');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "measurementUnit" "MeasurementUnit" NOT NULL DEFAULT 'METRIC';
