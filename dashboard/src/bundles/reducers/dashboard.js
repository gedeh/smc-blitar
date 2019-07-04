import { OPEN_DASHBOARD, RECEIVE_DASHBOARD } from "../action-creators/references"
const defaultState = {

    name: "",
    title: "",
    rows: [],
    isFetching: false,
    error: undefined

}

export default ( state = defaultState, action ) => {

    const { type, ...extras } = action

    switch ( type ) {

        case OPEN_DASHBOARD:
        case RECEIVE_DASHBOARD:
            return Object.assign( {}, state, extras )
        default:
            return state

    }

}
