import React, { Component } from "react"
import PropTypes from "prop-types"
import { Bar, Line, Radar, Pie, Doughnut } from "react-chartjs-2"

import Card from "@components/ui-element/Card"
import { CardTitleWithLinkSmall } from "@components/ui-element/CardTitle"

import accents from "@components/static/main-accent.json"
import { randomAccent } from "@components/utils"

class ChartWidget extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return this.props.display
            ? this.renderChartAsCard()
            : this.renderChart()
    }

    renderChartAsCard() {
        const { accent, ...extras } = this.props.display

        return <Card accent={accent} className="darken-1">
            <div className="section">
                <CardTitleWithLinkSmall accent={accent || randomAccent()} {...extras} />
            </div>
            <div className="section">
                {this.renderChart()}
            </div>
        </Card>
    }

    renderChart() {
        const { isFetching, error, chart } = this.props
        const { type, height = 120, width } = chart

        if (isFetching || error) {
            return <div className="center-align mt-6">
                {this.renderPreloaderIcon(isFetching, type)}
                {this.renderPreloaderText(isFetching, error)}
            </div>
        }

        const { data = undefined, options } = this.props

        switch (type) {
            case "bar":
                return <Bar data={data} options={options} height={height} width={width} />
            case "line":
                return <Line data={data} options={options} height={height} width={width} />
            case "pie":
                return <Pie data={data} options={options} height={height} width={width} />
            case "doughnut":
                return <Doughnut data={data} options={options} height={height} width={width} />
            case "radar":
                return <Radar data={data} options={options} height={height} width={width} />
            case "stat":
                return this.extractStat(data)
            default:
                return <Bar data={data} options={options} height={height} width={width} />
        }

    }

    extractStat(statData) {
        const { datasets } = statData
        if (datasets && datasets.length > 0) {
            const { data } = datasets[0]
            if (data && data.length > 0) {
                return <h1 className="center-align"><strong>{data[0]}</strong></h1>
            }
        }

        return <h1 className="center-align"><strong>--</strong></h1>
    }

    renderPreloaderText(isFetching, message) {
        if (isFetching) return <p>Waiting chart data...</p>
        return message ? <p>{message}</p> : undefined
    }

    renderPreloaderIcon(isFetching, type) {
        if (isFetching) {
            switch (type) {
                case "bar":
                    return <i className="material-icons medium">insert_chart</i>
                case "line":
                    return <i className="material-icons medium">show_chart</i>
            }
            return <i className="material-icons medium">cloud_download</i>
        }

        return <i className="material-icons medium">cloud_off</i>
    }
}

ChartWidget.propTypes = {
    display: PropTypes.shape({
        accent: PropTypes.oneOf(accents),
        title: PropTypes.string,
        url: PropTypes.string
    }),
    chart: PropTypes.shape({
        type: PropTypes.oneOf(["stat", "bar", "line", "pie", "doughnut", "radar"]),
        height: PropTypes.number,
        width: PropTypes.number
    }),
    isFetching: PropTypes.bool,
    error: PropTypes.string,
    data: PropTypes.object,
    options: PropTypes.object
}

export default ChartWidget
