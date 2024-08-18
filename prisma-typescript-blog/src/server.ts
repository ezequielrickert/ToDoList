import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';
import express = require("express");
import elementRouter from './routes/listElement.route';
export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
    app.use(express.json());

    // Apply CORS middleware correctly
    app.use(cors());

    app.use("/listElement", elementRouter);

    // Catch unregistered routes
    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main()
    .then(async () => {
        await prisma.$connect();
        console.log("Connected to database");
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });