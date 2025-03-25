/*
  Warnings:

  - Added the required column `is_delete` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_delete` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "is_delete" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "is_delete" BOOLEAN NOT NULL;
