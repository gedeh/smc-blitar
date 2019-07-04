import { join } from "path"

const removeTrailingSlash = url => {
    return url && typeof url === "string"
        ? url.replace(/\/$/, "")
        : url
}

const ensureHasValue = (name, value) => {
    if (!value) throw new Error(`Configuration ${name} value is not specified`)
    return value
}

const config = {
    name: "smc-dashboard",
    port: process.env.APP_PORT || 3000,
    dataDirectory: process.env.DATA_DIRECTORY || join(__dirname, "../../", "data"),
    log: {
        level: process.env.LOG_LEVEL || "info"
    },
    metabase: {
        publicUrl: ensureHasValue("Metabase public URL", `${ removeTrailingSlash(process.env.METABASE_EXTERNAL_URL) }`),
        url: ensureHasValue("Metabase API URL", `${ removeTrailingSlash(process.env.METABASE_URL) }`),
        username: ensureHasValue("Metabase API username", process.env.METABASE_API_USERNAME),
        password: ensureHasValue("Metabase API password", process.env.METABASE_API_PASSWORD),
        key: process.env.METABASE_API_KEY
    }
}

export default config
