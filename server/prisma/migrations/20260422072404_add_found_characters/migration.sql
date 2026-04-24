-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "foundCharacters" TEXT[] DEFAULT ARRAY[]::TEXT[];
