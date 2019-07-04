import React, { Component } from "react"
import { Switch, Redirect, Route } from "react-router-dom"

import Header from "@components/ui-element/Header"
import Doc from "@components/ui-element/Doc"

import ConnectMenu from "@bundles/connect-containers/Menu"
import ConnectDashboardPage from "@bundles/connect-containers/Dashboard"

class App extends Component {

    constructor() {

        super()
        this.state = {}

    }

    render() {

        return <div>
            <Header />
            <div id="main">
                <div className="wrapper">
                    <ConnectMenu name="index" />
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/dashboard/index" />} />
                        <Route path="/dashboard/:name" render={props =>
                            <ConnectDashboardPage name={props.match.params.name} />
                        } />
                        <Route path="/docs/:name" render={props =>
                            <Doc name={props.match.params.name} />
                        } />
                    </Switch>
                </div>
            </div>
        </div>
    }

}

export default App
