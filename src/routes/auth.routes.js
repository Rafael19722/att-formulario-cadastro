require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const router = express.Router();

router.post("/register", async (req, res) => {
    const { firstname, lastname, email, phone, password, gender } = req.body;

    if (!firstname || !email || !password || !lastname || !phone || !gender) {
        return res
            .status(400)
            .json({ error: "Por favor preencha todas as informações!" });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Este e-mail já está cadastrado!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                phone,
                password: hashedPassword,
                gender,
            },
        });

        return res.status(201).json({
            id: user.id,
            name: user.firstname,
            email: user.email,
            createdAt: user.createdAt,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.firstname,
                email: user.email,
            },
            secret,
            { expiresIn: "1d" }
        );

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
