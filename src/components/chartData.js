import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, Tooltip, YAxis } from 'recharts'
import {Row, Col } from 'react-bootstrap'

const ChartData = props => {
  var data = []
  props.props.slice(1, 15).map(d => {
    data.push({ country: d.country, cases: d.cases,deaths:d.deaths,recovered:d.recovered,active:d.active })
    return d
  })
  return (
    <Col>
      <Row>
        <h5>Top 15 worst effected countries</h5>
        <LineChart
          width={1000}
          height={400}
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 25 }}
        >
          <Line type='monotone' dataKey='cases' stroke='#8884d8' />
          <Line type='monotone' dataKey='deaths' stroke='red' />
          <Line type='monotone' dataKey='recovered' stroke='green' />
          <Line type='monotone' dataKey='active' stroke='yellow' />
          <CartesianGrid stroke='#ccc' />
          <XAxis dataKey='country' />
          <YAxis />
          <Tooltip />
        </LineChart>
      </Row>
    </Col>
  )
}
export default ChartData
