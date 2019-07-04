import React from "react"
import PropTypes from "prop-types"

const titleStyle = accent => {
    return {color: accent !== "white" ? "white" : undefined}
}

const CardTitleWithLinkSmall = props => {
    const { title, url, accent } = props

    return <div id="card-stats">
        <p className="card-stats-title center-align">
            { url ?
                <a href={url} target="_blank" rel="noopener noreferrer" style={titleStyle(accent)}>
                    {title} <i className="material-icons">launch</i>
                </a> : title}
        </p>
    </div>
}

const CardTitleWithLinkBig = props => {
    const { title, url, accent } = props

    return <div className="row">
        <div className="col s9 m9 l9">
            <span className="card-title">{title}</span>
        </div>
        <div className="col s3 m3 l3 right-align">
            { url ?
                <a href={url} target="_blank" rel="noopener noreferrer" style={titleStyle(accent)}>
                    <i className="material-icons">launch</i>
                </a> : undefined}
        </div>

    </div>
}

CardTitleWithLinkBig.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    accent: PropTypes.string,
    url: PropTypes.string,
}

CardTitleWithLinkSmall.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    accent: PropTypes.string,
    url: PropTypes.string,
}

export {
    CardTitleWithLinkSmall,
    CardTitleWithLinkBig
}
