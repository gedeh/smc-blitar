import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

import ChartWidget from "@components/widgets/ChartWidget"

import axios from "axios"
import accents from "@components/static/main-accent.json"
import config from "@components/config"

const apiUrl = `${config.serverUrl}/api`
const defaultTitle = "Loading chart..."
moment.locale("id-ID")

class ChartWidgetContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFetching: true,
            title: defaultTitle
        }
        this.signal = axios.CancelToken.source()
    }

    componentWillUnmount() {
        this.signal.cancel( "Component will unmount" )
    }

    componentDidMount() {
        this.loadChartData().then( result => {
            if (result) this.setState(result)
        })
    }

    render() {
        const { title: newTitle, url, error, ...extras } = this.state
        const { display, chart } = this.props

        if (display) {
            const { accent, title: oldTitle } = display || { accent, title }
            const title = this.buildDisplayTitle(oldTitle, newTitle)

            return <ChartWidget display={{ accent, title, url }} chart={chart} error={error} {...extras} />
        }

        return <ChartWidget chart={chart} error={error} {...extras} />
    }

    buildDisplayTitle(oldTitle, newTitle) {
        if (newTitle && (!oldTitle || oldTitle === defaultTitle))
            oldTitle = newTitle
        return oldTitle
    }

    loadChartData() {
        const { data } = this.props

        if (typeof data === "string") return this.downloadDataFromMetabase(data)
        else return this.buildDataFromProps()
    }

    downloadDataFromMetabase(url) {
        const questionUrl = url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `${apiUrl}/${url}`

        const options = { cancelToken: this.signal.token }
        return axios.get( questionUrl, options ).then( response => {

            const { title, url, data, options } = response.data

            return Promise.resolve({
                title: title,
                isFetching: false,
                error: undefined,
                url: url,
                data: data,
                options: options
            })

        }).catch( error => {

            if ( !axios.isCancel( error ) ) {
                return Promise.resolve({
                    isFetching: false,
                    error: error && error.message
                        ? error.message
                        : error,
                    url: undefined,
                    data: undefined,
                    options: undefined
                })
            }
            else return Promise.resolve()

        })
    }

    buildDataFromProps() {
        const { display, data } = this.props
        const chartData = {
            labels: data,
            datasets: [{
                data: data
            }]
        }

        if (data) {
            const title = display && display.title
                ? display.title
                : "Chart title is not available"
            return Promise.resolve({
                isFetching: false,
                error: undefined,
                title: title,
                url: undefined,
                data: chartData,
                options: undefined
            })
        }
        else {
            return Promise.resolve({
                isFetching: false,
                error: "Chart data is not available",
                title: "Chart data is not available",
                url: undefined,
                data: chartData,
                options: undefined
            })
        }
    }

}

ChartWidgetContainer.propTypes = {
    display: PropTypes.shape({
        accent: PropTypes.oneOf(accents),
        title: PropTypes.string,
    }),
    chart: PropTypes.shape({
        type: PropTypes.oneOf(["stat", "bar", "line", "pie", "doughnut", "radar"]),
        height: PropTypes.number,
        width: PropTypes.number
    }),
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.string
    ]).isRequired
}

export default ChartWidgetContainer
