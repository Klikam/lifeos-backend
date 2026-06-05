import {Router} from "express";
import {findById, update, remove, create} from "../controllers/usersController"
import {idValidator} from "../middlewares/requestValidator";

const router: Router = Router()

router.get("/:id", idValidator, findById);
router.post("/", create);
router.put("/:id", idValidator, update);
router.delete("/:id", idValidator, remove)

export default router