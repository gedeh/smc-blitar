
// eslint-disable-next-line no-unused-vars
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import App from "@components/App"

import thunkMiddleware from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"

import reducers from "@bundles/reducers/index"

import "@components/utils/configure-charts"

let middlewares = [ thunkMiddleware ]
if ( process.env.NODE_ENV !== "production" ) {

    const { createLogger } = require( "redux-logger" )
    middlewares = [ ...middlewares, createLogger() ]

}

const store = createStore( reducers, applyMiddleware( ...middlewares ) )
export default ReactDOM.render(

    <Provider store={ store }>
        <HashRouter basename="/" hashType="slash">
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById("app-container")

)
