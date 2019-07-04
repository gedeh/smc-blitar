import React, { Component } from "react"
import PropTypes from "prop-types"

import WeatherWidget from "@components/widgets/WeatherWidget"

import axios from "axios"
import accents from "@components/static/main-accent.json"
import iconMap from "@components/static/owm-icons-map.json"

const reloadInMinutes = 60

class WeatherWidgetContainer extends Component {
    constructor() {
        super()
        this.state = {
            status: "loading",
            icon: "material-icons",
            temperature: "--",
            description: "loading..."
        }
        this.signal = axios.CancelToken.source()
    }

    componentDidMount() {
        const { city, country, appid, units } = this.props
        this.downloadWeatherData(city, country, appid, units)
    }

    componentWillUnmount() {
        this.signal.cancel( "Component will unmount" )
        this.unregisterReload()
    }

    render() {
        const { display, city, country } = this.props
        const { status, icon, temperature, description, extras } = this.state

        return <WeatherWidget
            status={status}
            icon={icon}
            temperature={temperature}
            description={description}
            extras={extras}

            accent={display.accent}
            city={city}
            country={country} />
    }

    downloadWeatherData(city, country, appid, units) {
        this.unregisterReload()

        axios.get("http://api.openweathermap.org/data/2.5/weather", {
            cancelToken: this.signal.token,
            params: {
                q: `${city},${country}`,
                units: `${units || "metric"}`,
                appid
            }
        }).then( response => {
            const { data } = response
            const { weather, main, sys, wind, visibility } = data
            const firstWeather = weather && weather[0]
                ? weather[0]
                : { id: "", main: "", description: "", icon: "" }

            this.setState({
                status: "complete",
                icon: this.convertWeatherIdToIcon(firstWeather.id),
                temperature: Math.round(main.temp),
                description: firstWeather.description,
                extras: {
                    main: main,
                    visibility: visibility,
                    wind: wind,
                    sun: {
                        sunrise: sys.sunrise,
                        sunset: sys.sunset
                    }
                }
            })

            this.registerReload()

        }).catch( error => {

            if ( !axios.isCancel( error ) ) {

                this.setState({
                    status: "error",
                    icon: "material-icons",
                    temperature: "--",
                    description: error.message ? error.message : JSON.stringify(error)
                })

                this.registerReload()

            }

        })
    }

    convertWeatherIdToIcon(id) {
        if (iconMap[id]) {
            var prefix = "wi wi-"
            var icon = iconMap[id].icon
            // If we are not in the ranges mentioned above, add a day/night prefix.
            if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
                icon = "day-" + icon
            }

            icon = prefix + icon
            return icon
        }

        throw new Error("ID passed to component invalid")
    }

    registerReload() {
        const interval = reloadInMinutes * 1000 * 60

        const { city, country, appid, units } = this.props
        this.timerId = setInterval( () => this.downloadWeatherData(city, country, appid, units), interval )

    }

    unregisterReload() {
        clearInterval( this.timerId )
    }

}

WeatherWidgetContainer.propTypes = {
    display: PropTypes.shape({
        accent: PropTypes.oneOf(accents).isRequired
    }),

    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,

    appid: PropTypes.string.isRequired,
    units: PropTypes.string
}

export default WeatherWidgetContainer
