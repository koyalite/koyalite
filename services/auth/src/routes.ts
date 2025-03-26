import { Router } from "express";

const router = Router();

router.get("/me", (req, res) => {
    // TODO: Validate session from cookie or token
    res.json({ id: "user_123", email: "user@example.com", role: "user" });
});

router.post("/logout", (req, res) => {
    // TODO: Clear session or token
    res.status(204).end();
});

// Add GitHub/Google callback routes here later

export default router;
