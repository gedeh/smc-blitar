import logger from "@utils/create-logger"
import axios from "axios"

const sendErrorResponse = (res, error) => {
    const diagnostic = error
        ? error.message
            ? error.message
            : error
        : "unknown"
    logger.info(`Sending error response: ${diagnostic}`)
    const response = { error: diagnostic }
    res.status(400).send(response)

}

const callBlitarApi = (req, res) => {

    const { data, view } = req.params
    const url = `http://api.blitarkota.go.id/?user=dashboard&data=${data}&view=${view}`
    return axios.get( url )
        .then( response => res.send( response.data ) )
        .catch( error => sendErrorResponse( res, error ) )

}

export default {
    configure: (app, router) => {
        router.get("/api/blitar-api/:data/:view", callBlitarApi)
    }
}
