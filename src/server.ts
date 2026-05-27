import serverConf from "./config/serverConfig.js";
import app from "./app.js";

app.listen(serverConf.port, serverConf.host, () => {
    console.log(`Server running on ${serverConf.host}:${serverConf.port} `)
})