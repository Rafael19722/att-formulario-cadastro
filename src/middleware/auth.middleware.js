require("dotenv").config();

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ error: "token mal formatado" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
        };
        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

module.exports = authMiddleware;
