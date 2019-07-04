import React, { Component } from "react"
import PropTypes from "prop-types"

import accents from "@components/static/main-accent.json"

class ContentSplitWidget extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { display, primary, children } = this.props
        const { accentPrimary, accentSecondary, titlePrimary, titleSecondary, icon } = display

        return <div className="card">
            <div className={`card-move-up ${accentPrimary} accent-4 waves-effect waves-block waves-light`}>
                <div className="move-up">
                    <p className="margin white-text">{titlePrimary}</p>
                    {primary}
                </div>
            </div>
            <div className={`card-content ${accentPrimary}`}>
                <a className={`btn-floating btn-move-up waves-effect waves-light ${accentSecondary} accent-2 z-depth-4 right`}>
                    <i className="material-icons activator">{icon}</i>
                </a>
                <div className="line-chart-wrapper">
                    <p className="margin white-text">{titleSecondary}</p>
                    <p>&nbsp;</p>
                </div>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{titleSecondary}
                    <i className="material-icons right">close</i>
                </span>
                {children}
            </div>
        </div>
    }
}

ContentSplitWidget.propTypes = {
    display: PropTypes.shape({
        accentPrimary: PropTypes.oneOf(accents).isRequired,
        accentSecondary: PropTypes.oneOf(accents).isRequired,
        icon: PropTypes.string.isRequired,
        titlePrimary: PropTypes.string.isRequired,
        titleSecondary: PropTypes.string.isRequired
    }),
    primary: PropTypes.element,
    children: PropTypes.node.isRequired
}

export default ContentSplitWidget
