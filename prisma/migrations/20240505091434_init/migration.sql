-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_image" TEXT NOT NULL,
    "article_link" TEXT NOT NULL,
    "liike_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
