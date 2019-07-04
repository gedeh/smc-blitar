import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import config from "@components/config"

const MainBrand = props => {
    const { title } = props

    return <div className="brand-sidebar">
        <h1 className="logo-wrapper">
            <a href="#" className="brand-logo darken-1">
                <img src="/images/logo/blitar-logo.png" alt="blitar logo" />
                <span className="logo-text hide-on-med-and-down">&nbsp;{title}</span>
            </a>
            <a href="#" className="navbar-toggler">
                <i className="material-icons">radio_button_checked</i>
            </a>
        </h1>
    </div>

}

const MainMenu = props => {
    const { title } = props

    return <aside id="left-sidebar-nav" className="nav-expanded nav-lock nav-collapsible">

        <MainBrand title={title}/>

        <ul id="slide-out" className="side-nav fixed leftside-navigation">
            <li className="no-padding">
                <ul className="collapsible" data-collapsible="accordion">
                    {props.children}
                </ul>

                <hr/>

                <ul className="collapsible" data-collapsible="accordion">
                    <li>
                        <a className="collapsible-header waves-effect waves-grey">
                            <i className="material-icons">import_contacts</i>
                            <span className="nav-text">Documentation</span>
                        </a>
                        <div className="collapsible-body">
                            <ul className="collapsible" data-collapsible="accordion">
                                <li>
                                    <Link to="/docs/menu"
                                        className="waves-effect waves-grey">
                                        <i className="material-icons">import_contacts</i>
                                        <span className="nav-text">Menu</span>
                                    </Link>
                                    <Link to="/docs/dashboard"
                                        className="waves-effect waves-grey">
                                        <i className="material-icons">import_contacts</i>
                                        <span className="nav-text">Dashboard</span>
                                    </Link>
                                    <Link to="/docs/widgets-blitar-api"
                                        className="waves-effect waves-grey">
                                        <i className="material-icons">import_contacts</i>
                                        <span className="nav-text">Widget: API Kota Blitar</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href={config.metabaseUrl}>
                            <i className="material-icons">stars</i>
                            <span className="nav-text">Metabase</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>

        <a href="#" data-activates="slide-out" className="sidebar-collapse btn-floating btn-medium waves-effect waves-light red hide-on-large-only">
            <i className="material-icons">menu</i>
        </a>

    </aside>
}

MainBrand.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string
    ]).isRequired
}

MainMenu.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string
    ]).isRequired,
    children: PropTypes.node.isRequired
}

export {
    MainBrand,
    MainMenu
}
