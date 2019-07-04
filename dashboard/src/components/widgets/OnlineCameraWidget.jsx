import React, { Component } from "react"
import PropTypes from "prop-types"
import accents from "@components/static/main-accent.json"
import { randomAccent } from "@components/utils"
import { CardTitleWithLinkBig } from "@components/ui-element/CardTitle"

class OnlineCameraWidget extends Component {

    constructor() {
        super()
    }

    render() {
        const { display, content, description } = this.props
        const { title, url, accent = randomAccent() } = display
        const textColor = accent !== "white" ? "white-text" : "grey-text text-darken-4"

        return <div className={`card ${accent} darken-3 ${textColor}`}>
            <div className="card-image">
                {this._renderContent(content)}
            </div>
            <div className="card-content">
                <CardTitleWithLinkBig title={title} accent={accent} url={url || content.url} />
                {description !== undefined ? <p>{description}</p> : undefined}
            </div>
        </div>
    }

    _renderContent(content) {
        if (content.type === "image") {
            return <img src={content.url} />
        }

        if (content.type === "video") {
            return <video autoPlay={true} controls loop={true} style={{width: "100%"}}>
                <source src={content.url} type={content.format}></source>
            </video>
        }

        return <h1>Unknown content type: {content.type}</h1>
    }

}

OnlineCameraWidget.propTypes = {
    display: PropTypes.shape({
        title: PropTypes.string.isRequired,
        accent: PropTypes.oneOf(accents),
        url: PropTypes.string
    }),
    content: PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["image", "video"]).isRequired,
        format: PropTypes.string,
    }),
    description: PropTypes.string
}

export default OnlineCameraWidget
