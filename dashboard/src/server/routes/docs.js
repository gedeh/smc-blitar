import logger from "@utils/create-logger"
import { join } from "path"
import fs from "fs"
import md from "markdown-it"

const markdown = new md()
let docsLocation = undefined

const getDocs = (req, res) => {
    const { name = "menu" } = req.params
    const location = join(docsLocation, `${name}.md`)

    logger.info(`Trying to load doc ${name}`)
    logger.info(`Trying to locate doc file in ${location}`)
    if (!fs.existsSync(location)) {
        logger.debug(`Documentation ${name} not available`)
        res.status(404).send(`Documentation ${name} not found`)
        return
    }

    logger.info(`Reading and parsing doc ${name}`)
    const doc = fs.readFileSync(location, { encoding: "UTF-8" })
    try {
        const parsed = markdown.render(doc)
        res.setHeader("Content-Type", "text/html")
        res.send(parsed)
    }
    catch (error) {
        const diagnostic = `Error when parsing ${name} into HTML`
        logger.error( diagnostic, error )

        res.setHeader("Content-Type", "application/json")
        res.status(500).send(diagnostic)
    }
}

export default {
    configure: (app, router) => {
        docsLocation = join(app.get("views"), "docs")
        router.get("/docs/:name", getDocs)
    }
}
