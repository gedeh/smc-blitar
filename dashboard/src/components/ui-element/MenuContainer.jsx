import React, { Component } from "react"
import PropTypes from "prop-types"

import { MainMenu } from "@components/ui-element/Brand"
import Menu from "@components/ui-element/Menu"

class MenuContainer extends Component {
    constructor() {
        super()
    }


    componentDidMount() {

        this.props.retrieveMenu( this.props.name )

    }

    render() {

        const { isFetching } = this.props

        if (isFetching) {
            return this.renderLoadingOrError("cloud_download", "Loading menu...", "Loading menu...")
        }
        else {
            const { error } = this.props
            if (error) return this.renderLoadingOrError("cloud_off", "Error", error)
            else {
                const { title, current, items, openDashboard } = this.props
                return <Menu title={title} current={current} menu={items} openDashboard={openDashboard} />
            }

        }
    }

    renderLoadingOrError(icon, message, caption) {
        const { title } = this.props
        return <MainMenu title={title}>
            <li>
                <a title={caption}>
                    <i className="material-icons">{icon}</i> <span>{message}</span>
                </a>
            </li>
        </MainMenu>
    }
}

MenuContainer.propTypes = {
    current: PropTypes.string,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.array,
    isFetching: PropTypes.bool,
    error: PropTypes.string,
    retrieveMenu: PropTypes.func.isRequired,
    openDashboard: PropTypes.func.isRequired
}

export default MenuContainer
