import React from 'react'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend
} from 'recharts'
import { Row, Col } from 'react-bootstrap'

const BarChartData = props => {
  var data = []
  props.props.slice(0, 15).map(d => {
    data.push({
      country: d.country,
      tests: d.tests,
      cases:d.cases
    })
    return d
  })
  return (
    <Col>
      <br></br>
      <Row>
        <BarChart
          width={1000}
          height={400}
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
        >
          <CartesianGrid strokeDasharray='5 5' />
          <XAxis dataKey='country' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='tests' fill='#8884d8' />
          <Bar dataKey="cases" fill="#82ca9d" />
        </BarChart>
      </Row>
    </Col>
  )
}
export default BarChartData
