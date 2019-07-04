import React, { Component } from "react"
import PropTypes from "prop-types"

import WidgetContainer from "@components/container/WidgetContainer"
import accents from "@components/static/main-accent.json"

class DashboardPage extends Component {
    constructor() {
        super()
    }

    render() {
        const { widgets } = this.props
        const { title, rows } = widgets
        if (title) {
            return <div>
                <h5 className="center-align flow-text mb-2">{title}</h5>
                {this.renderRows(rows)}
            </div>
        }
        else return this.renderRows(rows)
    }

    renderRows(rows) {
        if (!rows) return <div></div>
        return rows.map((row, index) => {
            return <div key={`dashboard-row-${++index}`} className={`row ${row.className || ""}`}>
                {this.renderColumns(row.cols)}
            </div>
        })
    }

    renderColumns(cols) {
        return cols.map((col, index) => {
            return <div key={`dashboard-col-${++index}`} className={`col ${col.className || ""}`}>
                {this.renderWidget(col, col.widget)}
            </div>
        })
    }

    renderWidget(column, widget) {
        return <WidgetContainer {...widget} />
    }
}

DashboardPage.propTypes = {
    widgets: PropTypes.shape({
        rows: PropTypes.arrayOf(PropTypes.shape({
            className: PropTypes.string,
            cols: PropTypes.arrayOf(PropTypes.shape({
                className: PropTypes.string,
                widget: PropTypes.shape({
                    type: PropTypes.string.isRequired,
                    display: PropTypes.shape({
                        accent: PropTypes.oneOf(accents)
                    })
                })
            }))
        }))
    })
}

export default DashboardPage
