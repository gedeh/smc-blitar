import { createStore } from "redux"
import reducers from "./reducers"

const initialState = {

    menu: "index",
    dashboard: "index"

}

/**
menu: {

    title: "",
    name: "menu-name",
    isFetching: true/false,
    error: "Error message",
    items: [
        {
            name: "menu-name",
            dashboard: "dashboard-name",
            icon: "icon-name",
            title: "Title",
            items: [
                {
                    ...same as menu
                }
            ]
        },
        ...
    ],
},
dashboard: [
    {
        name: "dashboard-name"
        isFetching: true/false,
        error: "Error message",
        title: "Dashboard title",
        rows: [
            {
                columns: [
                    {
                        size: "s12 m6 l3",
                        widget: {
                            ...widget fields
                        }
                    }
                ]
            }
        ]
    },
    ...
]
*/

export default createStore(

    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

)
