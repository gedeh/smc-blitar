import config from "@server/config"
import logger from "@utils/create-logger"
import prepareDefaults from "@utils/populate-data"
import indexRouter from "@routes/index"
import dashboardRouter from "@routes/dashboard"
import metabaseRouter from "@routes/metabase"
import blitarApiRouter from "@routes/blitar-api"
import docsRouter from "@routes/docs"

import { join } from "path"
const staticFiles = join(__dirname, "../", "../", "public")
const viewLocations = join(__dirname, "../", "views")
const dataLocations = config.dataDirectory

import { renderFile as engine } from "ejs"
import express, { Router, static as serveStatic } from "express"

const app = express()
const router = Router()

app.engine("html", engine)
app.set("view engine", "html")
app.set("jsons", dataLocations)
app.set("views", viewLocations)

app.use(serveStatic(staticFiles))

indexRouter.configure(app, router)
dashboardRouter.configure(app, router)
metabaseRouter.configure(app, router)
blitarApiRouter.configure(app, router)
docsRouter.configure(app, router)

app.use("/", router)

app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port} using env "${process.env.NODE_ENV}" and configuration:`, config)
    const isDevelopment = process.env.NODE_ENV !== "production"
    prepareDefaults( join( viewLocations, "json" ), dataLocations, isDevelopment )

})

export default app
