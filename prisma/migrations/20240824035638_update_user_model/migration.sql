/*
  Warnings:

  - Made the column `firtName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firtName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
