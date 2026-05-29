import dotenv from "dotenv";

dotenv.config();

interface DbConfig {
    url: string
}

const getDbUrl = () => {
    if (!process.env.DATABASE_URL)
        throw new Error("Database URL is not set")
    return process.env.DATABASE_URL
}

export const dbConfig: DbConfig = {
    url: getDbUrl()
}