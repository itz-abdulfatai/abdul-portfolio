-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "category" TEXT DEFAULT 'All',
ADD COLUMN     "priority" DOUBLE PRECISION DEFAULT 1,
ADD COLUMN     "public" BOOLEAN DEFAULT true;
