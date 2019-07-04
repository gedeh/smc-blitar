import logger from "@utils/create-logger"
import { join } from "path"
import fs from "fs"
let menuLocation
let dashboardLocation

const getDashboardByName = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    const { name = "index" } = req.params
    const location = join(dashboardLocation, `${name}.json`)

    if (!fs.existsSync(location)) {
        logger.debug(`Dashboard ${name} not available`)
        res.status(404).send(`Dashboard ${name} not found`)
        return
    }

    logger.debug(`Sending dashboard ${name}`)
    const dashboard = fs.readFileSync(location)
    res.send(dashboard)
}

const getMenuByName = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    const { name = "index" } = req.params
    const location = join(menuLocation, `${name}.json`)

    if (!fs.existsSync(location)) {
        logger.debug(`Menu ${name} not available`)
        res.status(404).send(`Menu ${name} not found`)
        return
    }

    logger.debug(`Sending menu ${name}`)
    const menu = fs.readFileSync(location)
    res.send(menu)
}

export default {
    configure: (app, router) => {
        menuLocation = join(app.get("jsons"), "menu")
        dashboardLocation = join(app.get("jsons"), "dashboard")
        router.get("/api/dashboard/:name*?", getDashboardByName)
        router.get("/api/menu/:name*?", getMenuByName)
    }
}
