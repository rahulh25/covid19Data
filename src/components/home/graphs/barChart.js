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
import axios from 'axios'

class BarChartData extends React.Component {
  constructor () {
    super()
    this.state = { graphData: [] }
  }
  componentDidMount () {
    axios.get('https://corona.lmao.ninja/v2/countries').then(response => {
      response.data.sort((r1, r2) => {
        if (r1.cases > r2.cases) return -1
        if (r1.votes < r2.votes) return 1
        return 0
      })
      var data = []
      console.log(response.data)
      response.data.slice(0, 15).map(d => {
        data.push({
          country: d.country,
          tests: d.tests,
          cases: d.cases
        })
      })
      this.setState({
        graphData: data
      })
    })
  }
  render () {
    return (
      <Col>
        <h5 className='AlignTextCenter' style={{ marginTop: '5px' }}>
          Number of Tests in Top 15 worst effected countries (by number of cases)
        </h5>
        <br></br>
        <Row>
          <BarChart
            width={1000}
            height={500}
            data={this.state.graphData}
            margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
          >
            <CartesianGrid strokeDasharray='5 5' />
            <XAxis dataKey='country' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='tests' fill='#8884d8' />
            <Bar dataKey='cases' fill='#82ca9d' />
          </BarChart>
        </Row>
      </Col>
    )
  }
}
export default BarChartData
