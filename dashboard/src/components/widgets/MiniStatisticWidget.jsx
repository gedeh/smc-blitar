import React, { Component } from "react"
import PropTypes from "prop-types"

import { CardTitleWithLinkSmall } from "@components/ui-element/CardTitle"
import ContentAndActionWidget from "@components/widgets/ContentAndActionWidget"
import ChartWidgetContainer from "@components/widgets/ChartWidgetContainer"
import accents from "@components/static/main-accent.json"

class MiniStatisticWidget extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { display, chart, data, current } = this.props
        const { accent, icon, url, title } = display

        return <ContentAndActionWidget
            accent={accent}
            action={<ChartWidgetContainer chart={chart} data={data} />}>
            <CardTitleWithLinkSmall accent={accent} title={<span><i className="material-icons">{icon}</i> {title}</span>} url={url} />
            {<ChartWidgetContainer chart={{ type: "stat" }} data={
                typeof current === "string"
                    ? current
                    : [ current ]} />}
        </ContentAndActionWidget>
    }
}

MiniStatisticWidget.propTypes = {
    display: PropTypes.shape({
        accent: PropTypes.oneOf(accents).isRequired,
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
    }),
    chart: PropTypes.shape({
        type: PropTypes.oneOf(["bar", "line"]),
        height: PropTypes.number,
        width: PropTypes.number,
    }),
    data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.number)
    ]),
    current: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]).isRequired
}

export default MiniStatisticWidget
