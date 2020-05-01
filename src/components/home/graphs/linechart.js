import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend
} from 'recharts'
import { Row, Col } from 'react-bootstrap'

const ChartData = props => {
  var data = []
  props.props.slice(0, 15).map(d => {
    data.push({
      country: d.country,
      cases: d.cases,
      deaths: d.deaths,
      recovered: d.recovered,
      active: d.active,
    })
    return d
  })
  return (
    <Col>
      <h5 className='AlignTextCenter'>Top 15 worst effected countries (by number of cases)</h5>
      <br></br>
      <Row>
        <LineChart
          width={1000}
          height={400}
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
        >
          <Line type='monotone' dataKey='cases' stroke='#8884d8' />
          <Line type='monotone' dataKey='deaths' stroke='red' />
          <Line type='monotone' dataKey='recovered' stroke='green' />
          <Line type='monotone' dataKey='active' stroke='yellow' />
          <CartesianGrid stroke='#ccc' strokeDasharray="5 5" />
          <XAxis dataKey='country' />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </Row>
    </Col>
  )
}
export default ChartData
