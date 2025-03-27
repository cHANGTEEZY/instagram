-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "User_Details" (
    "user_details_id" TEXT NOT NULL,
    "bio" TEXT,
    "profile_pic_link" TEXT,
    "birth_date" TIMESTAMP(3),
    "gender" TEXT,
    "location" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "User_Details_pkey" PRIMARY KEY ("user_details_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Details_user_id_key" ON "User_Details"("user_id");

-- AddForeignKey
ALTER TABLE "User_Details" ADD CONSTRAINT "User_Details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
