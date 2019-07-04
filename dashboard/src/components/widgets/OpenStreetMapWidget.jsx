import React, { Component } from "react"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"

import Card from "@components/ui-element/Card"
import { CardTitleWithLinkBig } from "@components/ui-element/CardTitle"

class OpenStreetMapWidget extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { display, position = [-8.100, 112.150], zoom = 13 } = this.props
        const MapStyle = {
            width: "100%",
            height: "400px"
        }
        return (
            <Card {...display}>
                <CardTitleWithLinkBig {...display} />
                <Map center={position} zoom={zoom} style={MapStyle}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {this.renderMarkers()}
                </Map>
            </Card>
        )
    }

    renderMarkers() {
        const { markers = [] } = this.props
        return markers.map(marker => {
            return <Marker key={marker.name} position={marker.position}>
                <Popup>
                    <div dangerouslySetInnerHTML={{ __html: marker.content }}></div>
                </Popup>
            </Marker>
        })
    }
}

export default OpenStreetMapWidget
