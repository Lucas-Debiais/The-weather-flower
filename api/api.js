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
    const {name} = req.body;
    if (typeof name !== "string"){
        return res.status(400).send({400:"Name should be a string"})
    }
    try {
        const result = await prisma.result.create({data: {name: req.body.name}});
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

//Lister les données
app.get("/api/data", authorizationMiddleware, async (req, res) => {
    try {
        const result = await prisma.result.findMany({take: 100, orderBy: {name: "asc"}});
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

//Suppression d'une donnée
app.delete("/api/:dataName", authorizationMiddleware, async(req, res) => {
    try {
        const {dataName} = req.params;
        const result = await prisma.result.delete({where: {name: dataName}});
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