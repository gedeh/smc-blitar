import React, { Component } from "react"
import PropTypes from "prop-types"

import Card from "@components/ui-element/Card"
import ChartWidgetContainer from "@components/widgets/ChartWidgetContainer"
import WeatherWidgetContainer from "@components/widgets/WeatherWidgetContainer"
import OnlineCameraWidget from "@components/widgets/OnlineCameraWidget"
import FrameWidget from "@components/widgets/FrameWidget"
import MiniStatisticWidget from "@components/widgets/MiniStatisticWidget"
import OpenStreetMapWidget from "@components/widgets/OpenStreetMapWidget"
import BlitarApiChartContainer from "@components/widgets/BlitarApiChartContainer"

import accents from "@components/static/main-accent.json"


class WidgetContainer extends Component {
    constructor() {
        super()
    }

    render() {
        const { type, display, chart, ...extras } = this.props

        switch (type) {
        case "mini-statistic":
            return <MiniStatisticWidget
                display={display}
                chart={chart}
                {...extras} />
        case "chart":
            return <ChartWidgetContainer display={display} chart={chart} {...extras} />
        case "blitar-api":
            return <BlitarApiChartContainer display={display} chart={chart} {...extras} />
        case "weather":
            return <WeatherWidgetContainer display={display} {...extras} />
        case "cctv":
            return <OnlineCameraWidget display={display} {...extras} />
        case "frame":
            return <FrameWidget display={display} {...extras} />
        case "map":
            return <OpenStreetMapWidget display={display} {...extras} />
        }

        return <Card className="darken-3">
            <span className="card-title">Unknown Widget</span>
            <p className="mb-8">Unable to render an unknown widget: <strong>{type}</strong></p>
            <p>{JSON.stringify(this.props)}</p>
        </Card>
    }
}

WidgetContainer.propTypes = {
    type: PropTypes.oneOf(["mini-statistic", "weather", "chart", "blitar-api", "cctv", "frame", "map"]).isRequired,
    display: PropTypes.shape({
        accent: PropTypes.oneOf(accents),
        icon: PropTypes.string,
        title: PropTypes.string,
    }),
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string])
}

export default WidgetContainer
