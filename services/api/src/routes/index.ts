import { Router } from "express";
import { exampleController } from "../controllers/example";

const router = Router();

router.get("/example", exampleController);

export default router;
