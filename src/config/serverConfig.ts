import dotenv from "dotenv";

dotenv.config();

interface ServerConf {
    port: number,
    host: string,
    nodeEnv: string
}

const serverConf: ServerConf = {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || "0.0.0.0",
    nodeEnv: process.env.NODE_ENV || "DEV"
}

export default serverConf