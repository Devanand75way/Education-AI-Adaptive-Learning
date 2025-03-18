import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
    // Load JSON data from a file
    const data = JSON.parse(fs.readFileSync("./java_quiz_dataset.json", "utf-8"));

    // Insert each question into the database
    for (const item of data) {
        await prisma.question.create({
            data: {
                topic: item.topic,
                question: item.question,
                options: JSON.stringify(item.options), // Convert array to string
                answer: item.answer,
                difficulty: item.difficulty,
            },
        });
    }

    console.log("Data inserted successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
});
