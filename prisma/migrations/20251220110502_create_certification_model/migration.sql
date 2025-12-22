-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "certLink" TEXT,
    "dateIssued" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3),
    "issuingOrganization" TEXT,
    "description" TEXT,
    "softDelete" BOOLEAN DEFAULT false,
    "settingId" TEXT NOT NULL,
    "priority" DOUBLE PRECISION DEFAULT 1,
    "public" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certification_id_key" ON "Certification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Certification_name_key" ON "Certification"("name");

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "Setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
