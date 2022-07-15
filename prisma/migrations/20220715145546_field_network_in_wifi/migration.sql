/*
  Warnings:

  - You are about to drop the column `ssid` on the `keys_wifi` table. All the data in the column will be lost.
  - Added the required column `network` to the `keys_wifi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "keys_wifi" DROP COLUMN "ssid",
ADD COLUMN     "network" TEXT NOT NULL;
