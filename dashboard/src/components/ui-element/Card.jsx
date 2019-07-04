import React, { Component } from "react"
import PropTypes from "prop-types"
import accents from "@components/static/main-accent.json"
import { randomAccent } from "@components/utils"
class Card extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { accent = randomAccent(), className } = this.props
        return <div className={`card ${accent} ${className}`}>
            <div className={`card-content ${accent !== "white" ? "white-text" : "grey-text text-darken-4"}`}>
                {this.props.children}
            </div>
        </div>
    }

}

Card.propTypes = {
    accent: PropTypes.oneOf(accents),
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Card
