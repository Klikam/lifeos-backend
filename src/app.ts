import express, {type Express} from "express";
import habitRoutes from "./routes/habitRoutes.js";
import {errorHandler} from "./middlewares/errorHandler.js";

const app: Express = express();

app.use(express.json())

// Routes
app.use("/api/habits", habitRoutes)

// Global error handling
app.use(errorHandler)

export default app