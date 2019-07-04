import { createLogger } from "bunyan"
import config from "@server/config"

const logger = createLogger({
    name: config.name,
    level: config.log.level
})

export default logger
