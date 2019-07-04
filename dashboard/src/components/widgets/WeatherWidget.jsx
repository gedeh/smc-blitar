import React, { Component } from "react"
import PropTypes from "prop-types"
import accents from "@components/static/main-accent.json"

import Card from "@components/ui-element/Card"

class WeatherWidget extends Component {
    constructor(props) {
        super(props)
    }

    renderStatusAsIcon(status) {
        switch (status) {
        case "complete":
            return ""
        case "loading":
            return "cloud_download"
        case "error":
            return "cloud_off"
        }
    }

    render() {
        const { accent, city, country, status, icon, temperature, description, extras } = this.props

        return <Card accent={accent} className="darken-3">
            <div className="row">
                <div className="col s5 m5 padding-10 center-align">
                    <div className="padding-10">
                        <i className={`${icon} medium`}>{this.renderStatusAsIcon(status)}</i>
                    </div>
                </div>
                <div className="col s7 m7">
                    <h3>{temperature}&deg;</h3>
                    <h5>{city}, {country}</h5>
                    <p>{description}</p>
                </div>
            </div>
            {this.renderExtras(accent, extras)}
        </Card>
    }

    renderExtras(accent, extras) {
        if (!extras) return

        return <div className="row mt-10">
            <div className="col s3 m3 l3">
                <div className="center-align">{extras.wind.speed ? Math.round(extras.wind.speed) : "--"} KM/H</div>
                <div className={`center-align ${accent}-text text-lighten-3`}>wind</div>
            </div>
            <div className="col s3 m3 l3">
                <div className="center-align">{extras.visibility ? Math.round(extras.visibility / 1000) : "--"} KM</div>
                <div className={`center-align ${accent}-text text-lighten-3`}>visibility</div>
            </div>
            <div className="col s3 m3 l3">
                <div className="center-align">{`${extras.main.pressure | "--"}`} MB</div>
                <div className={`center-align ${accent}-text text-lighten-3`}>pressure</div>
            </div>
            <div className="col s3 m3 l3">
                <div className="center-align">
                    {Math.round(extras.main.temp_min)}&deg; - {Math.round(extras.main.temp_max)}&deg;
                </div>
                <div className={`center-align ${accent}-text text-lighten-3`}>temp</div>
            </div>
        </div>

    }
}

WeatherWidget.propTypes = {
    accent: PropTypes.oneOf(accents).isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
        "complete", "loading", "error"]).isRequired,
    icon: PropTypes.string.isRequired,
    temperature: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired
}

export default WeatherWidget
