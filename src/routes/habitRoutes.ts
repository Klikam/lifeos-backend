import {Router} from "express";
import {createHabit, deleteHabit, getHabitById, getHabits, updateHabit} from "../controllers/habitController.js";
import {habitsValidator} from "../middlewares/requestValidator.js";

const router: Router = Router()

router.get("/", getHabits)
router.get("/:id", getHabitById)
router.post("/", habitsValidator, createHabit)
router.put("/:id", habitsValidator, updateHabit)
router.delete("/:id", deleteHabit)

export default router;