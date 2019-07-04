import React, { Component } from "react"
import PropTypes from "prop-types"

import Card from "@components/ui-element/Card"
import config from "@components/config"
import axios from "axios"

const docUrl = `${config.serverUrl}/docs`

class Doc extends Component {

    constructor(props) {
        super(props)
        this.signal = axios.CancelToken.source()
        this.state = {
            isFetching: true,
            doc: undefined
        }
    }

    componentWillUnmount() {
        this.signal.cancel( "Component will unmount" )
    }

    componentDidMount() {
        const { name } = this.props
        this._retrieveDoc( name )
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.name !== this.props.name ) {
            this.setState({
                isFetching: true,
                doc: undefined,
                error: undefined
            })

            this._retrieveDoc( this.props.name )
        }
    }

    render() {
        const { name } = this.props
        const { isFetching, doc, error } = this.state
        if (isFetching) {
            return <div className="row">
                <div className="col s12 m12 l12">
                    <Card accent="indigo">
                        <span className="card-title">Loading documentation</span>
                        <p>Fetching documentation <strong>{name}</strong></p>
                    </Card>
                </div>
            </div>
        }

        if (error) {
            return <div className="row">
                <div className="col s12 m12 l12">
                    <Card accent="red">
                        <span className="card-title">Failed loading documentation <strong>{name}</strong></span>
                        <p>{error}</p>
                    </Card>
                </div>
            </div>
        }

        return <section id="content">
            <div className="container">
                <div className="pt-1">
                    <Card accent="white">
                        <div dangerouslySetInnerHTML={{
                            __html: doc || error
                        }}/>
                    </Card>
                </div>
            </div>
        </section>
    }

    _retrieveDoc( name ) {
        const options = { cancelToken: this.signal.token }
        const url = `${docUrl}/${name}`

        axios.get( url, options ).then( response => {

            this.setState({
                isFetching: false,
                doc: response.data
            })

        }).catch( error => this.setState({
            isFetching: false,
            error: error && error.message ? error.message : error
        }))
    }
}

Doc.propTypes = {
    name: PropTypes.string
}

export default Doc
