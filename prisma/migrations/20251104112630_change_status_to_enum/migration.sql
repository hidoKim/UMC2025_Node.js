/*
  Warnings:

  - You are about to alter the column `status` on the `member_mission` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `member_mission` MODIFY `status` ENUM('assigned', 'in_progress', 'completed', 'failed') NOT NULL DEFAULT 'assigned';
