import { connect } from "react-redux"
import { openMenu, openDashboard } from "@bundles/action-creators/index"
import MenuContainer from "@components/ui-element/MenuContainer"

const mapStateToProps = ( state, props ) => {

    const { menu } = state
    const { name, current } = props

    return {
        ...menu,
        name: name,
        current: current
    }

}

const mapDispatchToProps = dispatch => {

    return {

        retrieveMenu: name => {

            dispatch( openMenu( name ) )

        },

        openDashboard: dashboard => {

            dispatch( openDashboard( dashboard ) )

        }

    }

}

const ConnectMenu = connect(

    mapStateToProps,
    mapDispatchToProps

)( MenuContainer )

export default ConnectMenu
