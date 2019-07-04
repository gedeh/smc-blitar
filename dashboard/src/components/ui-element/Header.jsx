import React, { Component } from "react"

class Header extends Component {
    constructor() {
        super()

        this.state = {
            title: ""
        }
    }

    render() {

        return <header id="header" className="page-topbar">
            <div className="navbar-fixed">
                <nav className="navbar-color">
                    <div className="nav-wrapper">
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a title="Toggle fullscreen" className="waves-effect waves-block waves-light toggle-fullscreen" href="javascript:void(0);">
                                    <i className="material-icons">settings_overscan</i>
                                </a>
                            </li>
                            <li>
                                <a title="Login" className="waves-effect waves-block waves-light modal-trigger" data-target="login-form-modal" href="javascript:void(0);">
                                    <i className="material-icons">face</i>
                                </a>
                                { this.renderLoginForm() }
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    }

    renderLoginForm() {

        return <div id="login-form-modal" className="modal modal-fixed-footer">
            <div className="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
            </div>
        </div>

    }
}

export default Header
