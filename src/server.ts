import serverConf from "./config/serverConfig.js";
import app from "./app.js";
import {prisma} from "./lib/prisma";

const server = app.listen(serverConf.port, serverConf.host, () => {
    console.log(`Server running on ${serverConf.host}:${serverConf.port} `)
})

process.on('SIGTERM', async () => {
    await prisma.$disconnect()
    server.close(() => process.exit(0))
})