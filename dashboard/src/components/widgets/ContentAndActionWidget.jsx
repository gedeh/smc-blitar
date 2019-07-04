import React, { Component } from "react"
import PropTypes from "prop-types"

import accents from "@components/static/main-accent.json"

class ContentAndActionWidget extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { accent, children } = this.props
        return <div id="card-stats" className="card">
            <div className={`card-content ${accent} white-text`}>

                {children}

            </div>

            {this.renderAction()}
        </div>

    }

    renderAction() {
        const {accent, action} = this.props
        if (action) {
            return <div className={`card-action ${accent} darken-1 white-text`}>
                {action}
            </div>
        }
    }
}

ContentAndActionWidget.propTypes = {
    accent: PropTypes.oneOf(accents).isRequired,
    action: PropTypes.node,
    children: PropTypes.node.isRequired
}

export default ContentAndActionWidget
