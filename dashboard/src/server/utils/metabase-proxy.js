import axios from "axios"
import moment from "moment"
import randomColor from "randomcolor"
import config from "@server/config"
import logger from "@utils/create-logger"

moment.locale("id-ID")

const { url, publicUrl, username, password, key } = config.metabase
let apiKey = key
const createSessionRequestBody = {

    username: username,
    password: password

}

const useAuthenticationKey = () => {

    return { "X-Metabase-Session": apiKey }

}

const authenticate = () => {

    return new Promise((resolve, reject) => {

        if (apiKey) {

            logger.info("Using existing or configured Metabase API key")
            logger.debug(`Using Metabase API key: ${apiKey}`)
            return resolve()

        }

        const api = `${url}/api/session`
        logger.info(`Authenticating to Metabase ${api}`)
        axios.post(api, createSessionRequestBody, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then( response => {

            logger.info("Got authentication key from Metabase")
            logger.debug("Got authentication key from Metabase:", response.data)
            apiKey = response.data.id
            if (apiKey) resolve()
            else {
                const diagnostic = "Metabase authentication response is empty"
                logger.error(diagnostic, response)
                reject(new Error(diagnostic))
            }

        }).catch(error => {
            let data = {}
            if (error.response && error.response.data) data = error.response.data

            logger.error(`Unable to authenticate to Metabase: ${error.message}`, data)
            reject(error)

        })

    })

}

const simplifyCardResponse = card => {
    return {
        title: card.name,
        description: card.description,
        type: card.display,
        visual: card.visualization_settings,
        url: `${publicUrl}/question/${card.id}`
    }
}

const simplifyQueryResponse = query => {
    const axis = {}
    query.data.cols.forEach( column => {
        const name = column.name
        delete column.name
        delete column.table_id
        delete column.parent_id
        delete column.id
        delete column.fingerprint
        axis[name] = column
    })

    const keys = Object.keys( axis )
    const data = {}
    keys.map((column, index) => {
        data[column] = query.data.rows.map( row => row[index] )
    })

    const result = { keys, data, axis }

    return result

}

const retrieveCard = id => {

    const axiosConfig = { headers: useAuthenticationKey() }
    const api = `${url}/api/card/${id}`

    logger.info(`Requesting card ${id} from Metabase`)
    return axios.get(api, axiosConfig)
        .then(response => {

            const card = response.data
            logger.info(`Got card ${id} from Metabase: "${card.name}"`)
            return Promise.resolve(simplifyCardResponse(card))

        })
        .catch(error => {

            logger.error(`Unable to retrieve card ${id} from Metabase: ${error.message}`)
            return Promise.reject(error)

        })

}

const retrieveQuery = id => {
    const axiosConfig = { headers: useAuthenticationKey() }
    const api = `${url}/api/card/${id}/query`

    logger.info(`Requesting query ${id} from Metabase`)
    return axios.post(api, {}, axiosConfig)
        .then( response => {

            const query = response.data
            logger.info(`Got query ${id} from Metabase`, query.data.results_metadata
                ? query.data.results_metadata.checksum
                : query.data)
            return Promise.resolve(simplifyQueryResponse( query ))

        })
        .catch( error => {

            logger.error(`Unable to retrieve query ${id} from Metabase: ${error.message}`)
            return Promise.reject( error )

        })
}

const retrieveQuestion = id => {

    return new Promise((resolve, reject) => {

        if (!id) return reject(new Error("Card ID belongs to the query is required"))

        return authenticateThenRetrieveCardAndQuery( id ).catch( error => {

            if (apiKey) {
                logger.warn(`Got an issue "${error}" when retrieving question ${id} from Metabase. Retrying with new key...`)
                apiKey = undefined

                return authenticateThenRetrieveCardAndQuery( id )
                    .then( question => resolve( question ) )
                    .catch( error => reject( error ) )
            }

            reject( error )

        }).then( question => resolve( question ) ).catch( error => reject( error ) )

    }).then( question => buildChart( question ) )

}

const authenticateThenRetrieveCardAndQuery = id => {

    return authenticate().then(() => {

        logger.info(`Retrieving card & query ${id} from Metabase`)

        const cardPromise = retrieveCard(id)
        const queryPromise = retrieveQuery(id)

        return Promise.all([ cardPromise, queryPromise ]).then( result => {

            logger.info( `Got both card and query ${id} from Metabase` )
            const [ card, query ] = result
            const question = { card, query }

            logger.info( `Returning question ${id} from Metabase` )
            return question

        }).catch( error => {

            throw new Error( error.message || error )

        })

    }).catch( error => {

        throw new Error( error.message || error )

    })
}

const buildChart = question => {

    logger.info( "Building chart for the question" )
    const { card, query } = question

    const { metric } = extractMetric(card, query)
    const { hasTooltips, labels } = extractLabels(card, query)
    const { ...all } = buildChartDataAndOptions(card, metric, labels, hasTooltips)

    const chart = {
        title: card.title,
        type: card.type,
        url: card.url,
        ...all
    }

    if (config.log.level === "debug") {
        chart.question = question
    }

    return Promise.resolve(chart)

}

const buildChartDataAndOptions = (card, metric, labels, hasTooltips) => {
    let colors = ["rgba(0,0,0,0.35)"]
    let displayLegend = false
    if (card.type === "pie") {
        if (card.visual["pie.colors"]) {
            const pieColors = card.visual["pie.colors"]
            colors = pieColors
                ? (labels ? labels.map( label => pieColors[label] ) : [] )
                : colors
        }
        else {
            colors = randomColor( { count: labels.length } )
        }

        if (labels) {
            displayLegend = true
            const total = (metric || []).reduce( ( tot, x ) => tot + x )
            labels = labels.map( ( label, index ) => {
                return `${label} (${Math.round( metric[index] / total * 100 * 10) / 10}%)`
            })
        }
    }

    return {
        data: {
            labels: labels,
            datasets: [{
                data: metric,
                backgroundColor: colors
            }]
        },
        options: {
            title: {
                display: false
            },
            tooltips: {
                enabled: hasTooltips
            },
            legend: {
                display: displayLegend,
                position: "left",
                labels: {
                    fontColor: "#ffffff",
                    fontSize: 14
                }
            }
        }
    }
}

const extractMetric = (card, query) => {
    logger.debug( "Extracting metric from card and query" )
    const metrics = card.visual["graph.metrics"]
    const metricName = Array.isArray(metrics) && metrics.length
        ? metrics[0]
        : extractMetricFromAxis(query)
    const type = query.axis[metricName] ? query.axis[metricName].base_type : "type/Integer"
    return {
        metric: query.data[metricName],
        type: type
    }
}

const extractMetricFromAxis = query => {
    logger.debug( "Extracting metric from axis" )
    const keys = Object.keys(query.axis)
    const keyName = keys.find( axis => query.axis[axis].source === "aggregation" )
    return keyName
}

const extractLabelFromAxis = query => {
    logger.debug( "Extracting label from axis" )
    const keys = Object.keys(query.axis)
    const keyName = keys.find( axis => query.axis[axis].source === "breakout" )
    return keyName
}

const extractLabels = (card, query) => {
    logger.debug( "Extracting labels" )
    const dimensions = card.visual["graph.dimensions"]
    const hasDimension = Array.isArray(dimensions) && dimensions.length
    const dimensionName = hasDimension
        ? dimensions[0]
        : extractLabelFromAxis(query)
    const hasTooltips = query.keys.some( key => {
        return query.axis[key].base_type !== "type/Integer"
    })
    const labels = hasTooltips
        ? translateDimensionAsLabels(query, dimensionName)
        : query.data[dimensionName]

    return {
        hasTooltips,
        labels
    }
}

const translateDimensionAsLabels = (chart, dimensionName) => {
    logger.debug( "Translating dimensions as labels" )
    const dimensionUnit = chart.axis[dimensionName].unit
    const dimensionType = chart.axis[dimensionName].base_type
    const labels = chart.data[dimensionName]
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

    switch (dimensionType) {
        case "type/Date":
        case "type/DateTime":
            switch (dimensionUnit) {
                case "day-of-week":
                    return labels.map( day => days[day-1])
                case "hour-of-day":
                    return labels.map( hour => `${hour < 10 ? `0${hour}` : hour}`)
                case "day":
                    return labels.map( day => moment.parseZone(day).format("D MMM") )
                case "month":
                    return labels.map( day => moment.parseZone(day).format("MMM") )
            }
    }
    return labels
}

export default {
    authenticate,
    retrieveQuestion
}
