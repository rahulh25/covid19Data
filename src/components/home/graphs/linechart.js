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
import axios from 'axios'

class ChartData extends React.Component {
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
          cases: d.cases,
          deaths: d.deaths,
          recovered: d.recovered,
          active: d.active
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
        <h5 className='AlignTextCenter' style={{marginTop:'5px'}}>
          Top 15 worst effected countries (by number of cases)
        </h5>
        <br></br>
        <Row>
          <LineChart
            width={1000}
            height={500}
            data={this.state.graphData}
            margin={{ top: 0, right: 0, bottom: 0, left: 50 }}
          >
            <Line type='monotone' dataKey='cases' stroke='#8884d8' />
            <Line type='monotone' dataKey='deaths' stroke='red' />
            <Line type='monotone' dataKey='recovered' stroke='green' />
            <Line type='monotone' dataKey='active' stroke='yellow' />
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <XAxis dataKey='country' />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </Row>
      </Col>
    )
  }
}
export default ChartData
