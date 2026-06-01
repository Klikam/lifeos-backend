import express, {type Express} from "express";
import habitRoutes from "./routes/habitRoutes.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import {requestLogger} from "./middlewares/reqResLogger";

const app: Express = express();

app.use(express.json())

// Logger -> must be before routes
app.use(requestLogger);

// Routes
app.use("/api/habits", habitRoutes)

// Global error handling
app.use(errorHandler)

export default app