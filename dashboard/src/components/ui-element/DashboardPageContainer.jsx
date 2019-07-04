import React, { Component } from "react"
import PropTypes from "prop-types"

import DashboardPage from "@components/ui-element/DashboardPage"
import Card from "@components/ui-element/Card"

class DashboardPageContainer extends Component {

    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        this.props.retrieveDashboard( this.props.name || "index" )
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.name !== this.props.name ) {
            this.props.retrieveDashboard( this.props.name )
        }
    }

    render() {
        const { isFetching, name } = this.props
        return <section id="content">
            <div className="container">
                <div className="pt-1">
                    { !isFetching
                        ? this._renderDashboard()
                        : this._renderLoading(name) }
                </div>
            </div>
        </section>
    }

    _renderDashboard() {

        const { error, title, rows } = this.props
        return error ? this._renderError() : <DashboardPage widgets={ { title, rows } } />

    }

    _renderError() {
        const { name, error } = this.props
        return <div className="row">
            <div className="col s12 m12 l12">
                <Card accent="red">
                    <span className="card-title">Failed loading dashboard <strong>{name}</strong></span>
                    <p>{error.message}</p>
                </Card>
            </div>
        </div>
    }

    _renderLoading(message) {
        return <div className="row">
            <div className="col s12 m12 l12">
                <Card accent="indigo">
                    <span className="card-title">Loading dashboard</span>
                    <p>Fetching dashboard <strong>{message}</strong></p>
                </Card>
            </div>
        </div>
    }
}

DashboardPageContainer.defaultProps = {
    name: "index"
}

DashboardPageContainer.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    rows: PropTypes.array,
    isFetching: PropTypes.bool,
    error: PropTypes.string,
    retrieveDashboard: PropTypes.func.isRequired
}

export default DashboardPageContainer
