import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import ReactTooltip from 'react-tooltip'
import axios from 'axios'
import { Container, Row, Card } from 'react-bootstrap'
import HomepageAlert from '../../../common/homepageAlert'

const INDIA_TOPO_JSON = require('./india.topo.json')

const PROJECTION_CONFIG = {
  scale: 500,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
}

// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
]

const DEFAULT_COLOR = '#EEE'

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
}

function IndiaHeatMap () {
  const [data, setData] = useState([])
  const [activecases, setActivecases] = useState(0)
  const [confirmedCases, setConfirmedCases] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [newconfirmedCases, setnewConfirmed] = useState(0)
  const [newDeaths, setnewDeaths] = useState(0)
  const [newRecovered, setnewRecovered] = useState(0)
  const [stateName, setStateName] = useState('')
  const [stateactivecases, setStateActivecases] = useState(0)
  const [stateconfirmedCases, setStateConfirmedCases] = useState(0)
  const [statedeaths, setStateDeaths] = useState(0)
  const [staterecovered, setStateRecovered] = useState(0)
  const [statenewconfirmedCases, setStatenewConfirmed] = useState(0)
  const [statenewDeaths, setStatenewDeaths] = useState(0)
  const [statenewRecovered, setStatenewRecovered] = useState(0)
  useEffect(() => {
    axios.get('https://api.covid19india.org/data.json').then(response => {
      setData(response.data['statewise'])
      setActivecases(response.data['statewise'][0]['active'])
      setConfirmedCases(response.data['statewise'][0]['confirmed'])
      setDeaths(response.data['statewise'][0]['deaths'])
      setRecovered(response.data['statewise'][0]['recovered'])
      setnewConfirmed(response.data['statewise'][0]['deltaconfirmed'])
      setnewDeaths(response.data['statewise'][0]['deltadeaths'])
      setnewRecovered(response.data['statewise'][0]['deltarecovered'])
    })
  })
  const colorScale = scaleQuantile()
    .domain(data.map(d => d.confirmed))
    .range(COLOR_RANGE)

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setStateName(geo.properties.name)
      setStateActivecases(current.active)
      setStateConfirmedCases(current.confirmed)
      setStateDeaths(current.deaths)
      setStateRecovered(current.recovered)
      setStatenewConfirmed(current.deltaconfirmed)
      setStatenewDeaths(current.deltadeaths)
      setStatenewRecovered(current.deltarecovered)
    }
  }

  const onMouseLeave = () => {
    setStateName('')
    setStateActivecases(0)
    setStateConfirmedCases(0)
    setStateDeaths(0)
    setStateRecovered(0)
    setStatenewConfirmed(0)
    setStatenewDeaths(0)
    setStatenewRecovered(0)
  }
  return (
    <div>
      <ReactTooltip>
        <h4>{stateName}</h4>
        <Row>
          <i>Total Cases:</i> &nbsp;
          <p className='text-danger'>{stateconfirmedCases}</p>
        </Row>
        <Row>
          <i>Total Deaths:</i>&nbsp;
          <p className='text-danger'>{statedeaths}</p>
        </Row>
        <Row>
          <i>Total Recoveries:</i>&nbsp;{' '}
          <p className='text-success'>{staterecovered}</p>
        </Row>
        <Row>
          <i>New Cases:</i> &nbsp;
          <p className='text-info'>{statenewconfirmedCases}</p>
        </Row>
        <Row>
          <i>New Deaths:</i>&nbsp;{' '}
          <p className='text-danger'>{statenewDeaths}</p>
        </Row>
        <Row>
          <i>New Recovered:</i>&nbsp;{' '}
          <p className='text-success'>{statenewRecovered}</p>
        </Row>
        <Row>
          <i>Active Cases:</i>&nbsp;
          <p className='text-warning'>{stateactivecases}</p>
        </Row>
      </ReactTooltip>
      <div>
        <Container fluid='lg'>
          <Card>
            <Card.Body className='backgroundcolorforpage'>
              <Row>
                <HomepageAlert
                  variant={'danger'}
                  heading={'Total Confirmed Cases'}
                  data={confirmedCases}
                />
                <HomepageAlert
                  variant={'danger'}
                  heading={'Total Deaths'}
                  data={deaths}
                />
                <HomepageAlert
                  variant={'success'}
                  heading={'Total Recovered'}
                  data={recovered}
                />
              </Row>
              <Row>
                <HomepageAlert
                  variant={'warning'}
                  heading={'New Confirmed'}
                  data={newconfirmedCases}
                />
                <HomepageAlert
                  variant={'danger'}
                  heading={'New Deaths'}
                  data={newDeaths}
                />
                <HomepageAlert
                  variant={'warning'}
                  heading={'Active Cases'}
                  data={activecases}
                />
                <HomepageAlert
                  variant={'success'}
                  heading={'New Recovered'}
                  data={newRecovered}
                />
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <hr></hr>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection='geoMercator'
          width={600}
          height={300}
          data-tip=''
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => s.statecode === geo.id)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      current ? colorScale(current.confirmed) : DEFAULT_COLOR
                    }
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  )
}

export default IndiaHeatMap
