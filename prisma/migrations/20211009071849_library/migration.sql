-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
