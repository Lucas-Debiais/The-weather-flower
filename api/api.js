import express from "express";
import {PrismaClient} from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient();

// Création de l'application
const app = express();

// Configuration des middleware
app.use(express.json());
const authorizationMiddleware = (req, res, next) => {
    // if(req.headers.authorization !== password) {
    //     return res.status(401).send("Unauthorized");
    // }
    return next();
}


app.use(express.static('dist'));

app.use(cors({
    origin: '*'
}));

// Configuration des routes
app.get("/api/health", (req, res) => {
    res.send("OK");
});

//Création d'une donnée
app.post("/api/data", authorizationMiddleware, async (req, res) => {
    const {temp, moist, bright} = req.body;
    try {
        const result = await prisma.infos.create({
            data: {
                temp: temp,
                moist: moist,
                bright: bright
            }
        });
        res.json(result);
        const oldestEntry = await prisma.infos.findMany({
            orderBy: {
                id: 'asc',
            },
            take: 1,
        });
        await prisma.infos.delete({
            where: {
                id: oldestEntry[0].id,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

//Lister les données
app.get("/api/data", authorizationMiddleware, async (req, res) => {
    try {
        const result = await prisma.infos.findMany();
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

// Lancement du server
app.listen(3000, () => {
    console.log('Server started !');
});