import { OPEN_MENU, RECEIVE_MENU } from "./references"
import requestStarted from "./request-started"
import config from "@components/config"
import axios from "axios"

const url = `${config.serverUrl}/api/menu`

const openMenu = name => {

    return dispatch => {

        dispatch( requestStarted( OPEN_MENU, { isFetching: true } ) )

        if ( !name ) return Promise.resolve()

        return axios.get(`${url}/${name}`).then( response => {

            dispatch( receiveMenu( name, {

                name,
                isFetching: false,
                items: response.data,
                error: undefined

            } ) )

        }).catch( error => {

            dispatch( receiveMenu( name, {

                name,
                isFetching: false,
                error: error.message || error

            } ) )

        })

    }

}

const receiveMenu = ( name, data ) => {

    return {

        type: RECEIVE_MENU,
        name,
        ...data

    }

}

export default openMenu
