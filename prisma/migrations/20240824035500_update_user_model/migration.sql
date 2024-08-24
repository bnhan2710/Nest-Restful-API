/*
  Warnings:

  - You are about to drop the column `hashePassword` on the `User` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashePassword",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ALTER COLUMN "firtName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
