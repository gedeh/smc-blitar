import { OPEN_MENU, RECEIVE_MENU } from "@bundles/action-creators/references"

const defaultState = {

    name: "",
    title: "",
    current: "",
    items: [],
    isFetching: false,
    error: undefined

}

export default ( state = defaultState, action ) => {

    const { type, ...extras } = action

    switch ( type ) {

        case OPEN_MENU:
        case RECEIVE_MENU:
            return Object.assign( {}, state, extras )
        default:
            return state

    }

}
