import React, { Component } from "react"
import PropTypes from "prop-types"

import axios from "axios"
import randomColor from "randomcolor"
import accents from "@components/static/main-accent.json"

import ChartWidget from "@components/widgets/ChartWidget"

const defaultTitle = "Loading chart..."

import config from "@components/config"
const blitarProxyUrl = `${config.serverUrl}/api/blitar-api`

class BlitarApiChartContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.signal = axios.CancelToken.source()
    }

    componentWillUnmount() {
        this.signal.cancel( "Component will unmount" )
    }

    componentDidMount() {
        this.setState(
            {
                isFetching: true,
                title: defaultTitle
            }
        )

        const { display, chart } = this.props

        this.loadChartData().then( result => {
            const isPieChart = chart.type === "pie" || chart.type === "doughnut"
            const keys = Object.keys( result.data )
            const backgroundColors = isPieChart
                ? randomColor( { count: result.label.length } )
                : undefined
            const dataSets = keys.map( ( key, index ) => {
                return {
                    label: key,
                    data: result.data[key],
                    backgroundColor: backgroundColors || ( result.color && result.color[index]
                        ? result.color[index]
                        : randomColor() )
                }
            })
            this.setState({
                isFetching: false,
                title: display.title,
                data: {
                    labels: result.label,
                    datasets: dataSets
                },
                options: {
                    title: {
                        display: false
                    },
                    tooltips: {
                        enabled: true
                    },
                    legend: {
                        display: isPieChart,
                        position: "left",
                        labels: {
                            fontColor: "#ffffff",
                            fontSize: 14
                        }
                    }
                }

            })
        }).catch( error => {

            if ( !axios.isCancel( error ) ) {

                this.setState( {
                    isFetching: false,
                    error: error && error.message
                        ? error.message
                        : error })

            }

        })
    }

    loadChartData() {
        const { url, label, data, color } = this.props
        const initial = data.reduce( ( obj, item ) => {

            obj[item] = []
            return obj

        }, {} )

        const options = { cancelToken: this.signal.token }
        return axios.get( `${blitarProxyUrl}/${url}`, options ).then( response => {

            const result = response.data
            return result.reduce( ( acc, item) => {

                const tooltip = item[label]
                if ( !tooltip ) return acc

                acc.label.push( tooltip )
                data.forEach( ( name, index ) => {

                    const value = item[name]
                    acc.data[name].push( value ? Math.floor(value) : 0 )
                    if (color) acc.color.push( color[ index ] )

                } )

                return acc

            }, { label: [], color: [], data: initial } )

        } )
    }

    render() {
        const { error, ...extras } = this.state
        const { display, chart } = this.props
        if (display) {
            const { accent, title, url } = display
            return <ChartWidget display={{ accent, title, url }} message={error} chart={chart} {...extras} />
        }

        return <ChartWidget chart={chart} {...extras} />
    }

}

BlitarApiChartContainer.propTypes = {
    display: PropTypes.shape({
        accent: PropTypes.oneOf(accents),
        title: PropTypes.string,
    }),
    chart: PropTypes.shape({
        type: PropTypes.oneOf(["stat", "bar", "line", "pie", "doughnut", "radar"]),
        height: PropTypes.number,
        width: PropTypes.number
    }),
    url: PropTypes.string,
    label: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string)
}

export default BlitarApiChartContainer
