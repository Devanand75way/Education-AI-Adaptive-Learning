-- CreateTable
CREATE TABLE "LearningTrack" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalAttempts" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "accuracy" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "lastDifficultyLabel" INTEGER NOT NULL DEFAULT 0,
    "topicJavaBasics" INTEGER NOT NULL DEFAULT 0,
    "topicJavaCollections" INTEGER NOT NULL DEFAULT 0,
    "topicJavaExceptions" INTEGER NOT NULL DEFAULT 0,
    "topicJavaMultithreading" INTEGER NOT NULL DEFAULT 0,
    "topicJavaOOP" INTEGER NOT NULL DEFAULT 0,
    "javaBasics" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "javaOOP" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "javaMultithreading" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "javaExceptions" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "javaCollections" DOUBLE PRECISION NOT NULL DEFAULT 0.5,

    CONSTRAINT "LearningTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningTrack_userId_key" ON "LearningTrack"("userId");

-- AddForeignKey
ALTER TABLE "LearningTrack" ADD CONSTRAINT "LearningTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
