-- CreateTable
CREATE TABLE "user_details" (
    "user_id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_username_key" ON "user_details"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_email_key" ON "user_details"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_password_key" ON "user_details"("password");
