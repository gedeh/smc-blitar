import { connect } from "react-redux"
import { openDashboard } from "@bundles/action-creators"

import DashboardPageContainer from "@components/ui-element/DashboardPageContainer"

const mapStateToProps = ( state, props ) => {

    const { dashboard } = state
    const { name } = props

    const page = name.replace( /^\//, "" )

    return {

        ...dashboard,
        name: page

    }
}

const mapDispatchToProps = dispatch => {

    return {

        retrieveDashboard: name => {

            dispatch( openDashboard( name ) )

        }

    }

}

const ConnectDashboardPage = connect(

    mapStateToProps,
    mapDispatchToProps

)( DashboardPageContainer )

export default ConnectDashboardPage
