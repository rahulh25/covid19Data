import React from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend
} from 'recharts'
import { Row, Col } from 'react-bootstrap'

const AreaChartData = props => {
  var data = []
  props.props.slice(0, 15).map(d => {
    data.push({
      country: d.country,
      casesPerOneMillion: d.casesPerOneMillion,
      deathsPerOneMillion: d.deathsPerOneMillion,
      testsPerOneMillion: d.testsPerOneMillion,
      test: d.tests
    })
    return d
  })
  return (
    <Col>
      <br></br>
      <Row>
        <AreaChart
          width={1000}
          height={400}
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorcv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='green' stopOpacity={0.8} />
              <stop offset='95%' stopColor='green' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='country' />
          <YAxis />
          <CartesianGrid strokeDasharray='5 5' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='casesPerOneMillion'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
          <Area
            type='monotone'
            dataKey='deathsPerOneMillion'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorPv)'
          />
          <Area
            type='monotone'
            dataKey='testsPerOneMillion'
            stroke='green'
            fillOpacity={1}
            fill='url(#colorcv)'
          />
          <Legend />
        </AreaChart>
      </Row>
    </Col>
  )
}
export default AreaChartData
