-- AlterTable
ALTER TABLE "ClientInfo" ADD COLUMN     "email" TEXT,
ADD COLUMN     "softDelete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "softDelete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "softDelete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "softDelete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "softDelete" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "social" ADD COLUMN     "softDelete" BOOLEAN DEFAULT false;
