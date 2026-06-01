import {Router} from "express";
import {create, remove, findById, findMany, update} from "../controllers/habitsController";
import {habitsValidator, idValidator} from "../middlewares/requestValidator.js";

const router: Router = Router()

router.get("/", findMany)
router.get("/:id", idValidator, findById)
router.post("/", habitsValidator, create)
router.put("/:id", idValidator, habitsValidator, update)
router.delete("/:id", idValidator, remove)

export default router;