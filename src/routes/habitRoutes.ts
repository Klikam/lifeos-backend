import {Router} from "express";
import {getHabits} from "../controllers/habitController.js";

const router: Router = Router()

router.get("/", getHabits)

export default router;