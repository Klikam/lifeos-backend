import express, {type Express} from "express";
import habitsRoutes from "./routes/habitsRoutes";
import usersRouter from "./routes/usersRoutes"
import {errorHandler} from "./middlewares/errorHandler.js";
import {requestLogger} from "./middlewares/reqResLogger.js";

const app: Express = express();

app.use(express.json())

// Logger -> must be before routes
app.use(requestLogger);

// Routes
app.use("/api/habits", habitsRoutes)
app.use("/api/users", usersRouter)

// Global error handling
app.use(errorHandler)

export default app