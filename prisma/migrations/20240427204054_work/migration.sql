-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT DEFAULT 'none',
    "buyMilk" BOOLEAN NOT NULL DEFAULT false,
    "milkInChai" BOOLEAN NOT NULL DEFAULT false,
    "sugarinChai" BOOLEAN NOT NULL DEFAULT false,
    "visits" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Story_id_key" ON "Story"("id");
