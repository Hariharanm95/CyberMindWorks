/*
  Warnings:

  - You are about to drop the column `salaryRange` on the `Job` table. All the data in the column will be lost.
  - Added the required column `experience` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lackPerAnnum` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."LocationType" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "salaryRange",
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "lackPerAnnum" TEXT NOT NULL,
ADD COLUMN     "locationType" "public"."LocationType" NOT NULL;
