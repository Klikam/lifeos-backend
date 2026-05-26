import serverConf from "./config/serverConfig.js";
import app from "./app.js";

app.listen(serverConf.port, () => {
    console.log(`Server running on port ${serverConf.port}`)
})