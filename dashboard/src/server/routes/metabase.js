import logger from "@utils/create-logger"
import proxy from "@utils/metabase-proxy"

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

const retrieveQuestion = (req, res) => {

    const { id } = req.params

    return proxy.retrieveQuestion(id)
        .then(response => {
            logger.info( `Sending response for question: ${id}` )
            res.send( response )
        })
        .catch( error => sendErrorResponse( res, error ))

}

export default {
    configure: (app, router) => {
        router.get("/api/question/:id*?", retrieveQuestion)

        logger.debug("Creating pre-authentication to Metabase to minimise authentication")
        proxy.authenticate().catch( error => {
            logger.error("Unable to prepare authentication key to Metabase", error.message || error)
        } )
    }
}
