import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { MainMenu } from "@components/ui-element/Brand"

class Menu extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

        if (window.$) {
            window.$( ".collapsible" ).collapsible()
            window.$( ".sidebar-collapse" ).sideNav({
                edge: "left"
            })
        }

    }

    render() {
        const { title } = this.props
        return <MainMenu title={title} >
            {this.renderMainMenu()}
        </MainMenu>
    }

    renderMainMenu() {
        const { menu: menus, openDashboard } = this.props
        return menus.map((menu) => {
            return <li key={`main-${menu.name}`}>
                <Link onClick={ () => { menu.dashboard ? openDashboard( menu.dashboard) : undefined } }
                    to={this.renderUrl(menu)}
                    replace={this.isReplace(menu)}
                    className={`${(menu.child ? "collapsible-header" : "")} waves-effect waves-grey`}>
                    <i className="material-icons">{menu.icon || "dashboard"}</i>
                    <span className="nav-text">{menu.title}</span>
                </Link>

                {this.renderSubMenu(menu, menu.child, openDashboard)}

            </li>
        })
    }

    renderSubMenu(parent, menus, openDashboard) {
        return menus ? <div className="collapsible-body">
            <ul className="collapsible" data-collapsible="accordion">
                {menus.map((menu) => {
                    return <li key={`${parent.name}-sub-menu-${menu.name}`}>
                        <Link onClick={ () => { openDashboard( menu.dashboard) } }
                            to={this.renderUrl(menu)}
                            replace={this.isReplace(menu)}
                            className={`${(menu.child ? "collapsible-header" : "")} waves-effect waves-grey`}>
                            <i className="material-icons">{menu.icon || "dashboard"}</i>
                            <span>{menu.title}</span>
                        </Link>

                        {menu.child ? this.renderSubMenu(menu, menu.child) : undefined}

                    </li>

                })}
            </ul>
        </div> : ""
    }

    isReplace(menu) {
        const { current } = this.props
        return `/${menu.dashboard}` === current
    }

    renderUrl(menu) {
        return {
            pathname: menu.dashboard && !menu.child
                ? `/dashboard/${menu.dashboard}`
                : undefined
        }
    }
}

Menu.propTypes = {
    title: PropTypes.string.isRequired,
    menu: PropTypes.array.isRequired,
    current: PropTypes.string,
    openDashboard: PropTypes.func.isRequired
}

export default Menu
