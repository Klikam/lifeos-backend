import express, {type Express} from "express";
import habitRoutes from "./routes/habitRoutes.js";

const app: Express = express();

app.use(express.json())

// Routes
app.use("/api/habits", habitRoutes)

export default app