/*
  Warnings:

  - The `frequencyPerWeek` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "frequencyPerWeek",
ADD COLUMN     "frequencyPerWeek" INTEGER;
