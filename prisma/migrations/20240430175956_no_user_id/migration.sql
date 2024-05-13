/*
  Warnings:

  - You are about to drop the column `user_id` on the `Story` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Story" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buyMilk" BOOLEAN NOT NULL DEFAULT false,
    "milkInChai" BOOLEAN NOT NULL DEFAULT false,
    "sugarinChai" BOOLEAN NOT NULL DEFAULT false,
    "visits" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Story" ("buyMilk", "createdAt", "id", "milkInChai", "sugarinChai", "visits") SELECT "buyMilk", "createdAt", "id", "milkInChai", "sugarinChai", "visits" FROM "Story";
DROP TABLE "Story";
ALTER TABLE "new_Story" RENAME TO "Story";
CREATE UNIQUE INDEX "Story_id_key" ON "Story"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
