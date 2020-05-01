import React from 'react'
import L from 'leaflet'
//import 'leaflet/dist/leaflet.css'
import './index.css'
import Map from './Map';

const LeafletMap = props => {
  const LOCATION = {
    lat: 0,
    lng: 0
  }
  const CENTER = [LOCATION.lat, LOCATION.lng]
  const DEFAULT_ZOOM = 2
  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect
  }
  //const position = [0, 0]
  const hasCountries = Array.isArray(props.props) && props.props.length > 0
  async function mapEffect ({ leafletElement: map } = {}) {
    if (!hasCountries || !map) return

    map.eachLayer(layer => {
      if (layer?.options?.name === 'OpenStreetMap') return
      map.removeLayer(layer)
    })

    const geoJson = {
      type: 'FeatureCollection',
      features: props.props.map((country = {}) => {
        const { countryInfo = {} } = country
        const { lat, long: lng } = countryInfo
        return {
          type: 'Feature',
          properties: {
            ...country
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        }
      })
    }
    
    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature
        let updatedFormatted
        let casesString

        const { country, updated, cases, deaths, recovered } = properties

        casesString = `${cases}`
        if (cases > 1000000) {
          casesString = `${casesString.slice(0, -6)}M+`
        } else if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}K+`
        }
        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString()
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `

        return L.marker(latlng, {
          icon: L.divIcon({
            className: 'icon',
            html
          }),
          riseOnHover: true
        })
      }
    })

    geoJsonLayers.addTo(map)
  }
  return (
    <Map {...mapSettings} id='map'/>
  )
}

export default LeafletMap
