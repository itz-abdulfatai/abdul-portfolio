/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ClientInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClientInfo_name_key" ON "ClientInfo"("name");
