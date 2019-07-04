import { OPEN_DASHBOARD, RECEIVE_DASHBOARD } from "./references"
import requestStarted from "./request-started"
import config from "@components/config"
import axios from "axios"

const url = `${config.serverUrl}/api/dashboard`

const openDashboard = name => {

    return dispatch => {

        dispatch( requestStarted( OPEN_DASHBOARD, { isFetching: true } ) )

        const page = name.replace( /^\//, "" )
        if ( !page ) return Promise.resolve()

        return axios.get(`${url}/${page}`).then( response => {

            const { title, rows } = response.data

            dispatch( receiveDashboard( page, {

                page,
                isFetching: false,
                title,
                rows,
                error: undefined

            } ) )

        }).catch( error => {

            dispatch( receiveDashboard( page, {

                page,
                isFetching: false,
                error: error.message || error

            } ) )

        })

    }

}

const receiveDashboard = ( name, data ) => {

    return {

        type: RECEIVE_DASHBOARD,
        name,
        ...data

    }

}
export default openDashboard
