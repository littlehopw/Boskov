/*
  Warnings:

  - You are about to alter the column `nota` on the `Avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `duracao` on the `Filme` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Avaliacao" ALTER COLUMN "nota" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Filme" ALTER COLUMN "duracao" SET DATA TYPE INTEGER;
