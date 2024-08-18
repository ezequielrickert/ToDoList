/*
  Warnings:

  - You are about to drop the column `descriptio` on the `Element` table. All the data in the column will be lost.
  - Added the required column `description` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Element" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "listId" INTEGER NOT NULL,
    CONSTRAINT "Element_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Element" ("id", "isActive", "listId") SELECT "id", "isActive", "listId" FROM "Element";
DROP TABLE "Element";
ALTER TABLE "new_Element" RENAME TO "Element";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
