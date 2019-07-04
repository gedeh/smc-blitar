import React, { Component } from "react"
import PropTypes from "prop-types"

import Card from "@components/ui-element/Card"
import { CardTitleWithLinkBig } from "@components/ui-element/CardTitle"

class FrameWidget extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { url, display } = this.props
        const { title, accent = "white", width, height } = display
        return <Card accent={accent}>
            <div className="section">
                <CardTitleWithLinkBig title={title} url={url} accent={accent} />
            </div>
            <div className="section">
                <iframe src={url} width={width} height={height} frameBorder="0"
                    sandbox="allow-forms allow-same-origin allow-scripts"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}></iframe>
            </div>
        </Card>
    }

}

FrameWidget.propTypes = {
    display: PropTypes.shape({
        accent: PropTypes.string,
        title: PropTypes.string,
        width: PropTypes.oneOfType([
            PropTypes.number, PropTypes.string
        ]).isRequired,
        height: PropTypes.number.isRequired
    }),
    url: PropTypes.string.isRequired,
}

export default FrameWidget
