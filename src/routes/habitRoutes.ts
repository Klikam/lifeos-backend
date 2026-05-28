import {Router} from "express";
import {createHabit, deleteHabit, getHabitById, getHabits, updateHabit} from "../controllers/habitController.js";

const router: Router = Router()

router.get("/", getHabits)
router.get("/:id", getHabitById)
router.post("/", createHabit)
router.put("/:id", updateHabit)
router.delete("/:id", deleteHabit)

export default router;