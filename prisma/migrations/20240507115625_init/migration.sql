-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "articleName" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL,
    "eyecatch" TEXT NOT NULL,
    "noteUrl" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
