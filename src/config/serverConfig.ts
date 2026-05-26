import dotenv from "dotenv";

dotenv.config();

interface ServerConf {
    port: number,
    nodeEnv: string
}

const serverConf: ServerConf = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "DEV"
}

export default serverConf