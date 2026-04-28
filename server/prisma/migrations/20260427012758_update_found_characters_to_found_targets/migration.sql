/*
  Warnings:

  - You are about to drop the column `foundCharacters` on the `GameSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "foundCharacters",
ADD COLUMN     "foundTargets" TEXT[] DEFAULT ARRAY[]::TEXT[];
