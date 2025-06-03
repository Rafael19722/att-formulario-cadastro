const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/me", authMiddleware, (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
});

module.exports = router;
