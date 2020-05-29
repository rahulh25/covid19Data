import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  AreaChart,
  Area
} from 'recharts'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

class IndiaChartData extends React.Component {
  constructor () {
    super()
    this.state = {
      graphData: [],
      totalactivecases: [],
      totalDeaths: [],
      totalRecovered: []
    }
  }
  componentDidMount () {
    axios.get('https://api.covid19india.org/data.json').then(response => {
      this.setState({
        graphData: response.data['cases_time_series'],
        totalactivecases: [
          0,
          parseInt(response.data['statewise'][0]['confirmed'])
        ],
        totalDeaths: [0, parseInt(response.data['statewise'][0]['deaths'])],
        totalRecovered: [
          0,
          parseInt(response.data['statewise'][0]['recovered'])
        ]
      })
    })
  }
  render () {
    return (
      <Col>
        <h5 className='AlignTextCenter' style={{ marginTop: '5px' }}>
          Cases/Deaths/Recoveries till date
        </h5>
        <Col>
          <Row>
            <LineChart
              width={650}
              height={400}
              data={this.state.graphData}
              margin={{ top: 0, right: 0, bottom: 0, left: 10 }}
            >
              <Line type='monotone' dataKey='dailyconfirmed' stroke='yellow' />
              <Line type='monotone' dataKey='totalconfirmed' stroke='#8884d8' />
              <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
              <XAxis dataKey='date' />
              <YAxis type='number' domain={this.state.totalactivecases} />
              <Tooltip />
              <Legend />
            </LineChart>
            <LineChart
              width={650}
              height={400}
              data={this.state.graphData}
              margin={{ top: 0, right: 0, bottom: 0, left: 10 }}
            >
              <Line type='monotone' dataKey='totaldeceased' stroke='#8884d8' />
              <Line type='monotone' dataKey='dailydeceased' stroke='red' />
              <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
              <XAxis dataKey='date' />
              <YAxis type='number' domain={this.state.totalDeaths} />
              <Tooltip />
              <Legend />
            </LineChart>
          </Row>
        </Col>
        <Col>
          <Row>
            <LineChart
              width={650}
              height={400}
              data={this.state.graphData}
              margin={{ top: 0, right: 0, bottom: 0, left: 10 }}
            >
              <Line type='monotone' dataKey='totalrecovered' stroke='#8884d8' />
              <Line type='monotone' dataKey='dailyrecovered' stroke='green' />
              <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
              <XAxis dataKey='date' />
              <YAxis type='number' domain={this.state.totalRecovered} />
              <Tooltip />
              <Legend />
            </LineChart>
            <AreaChart
              width={650}
              height={400}
              data={this.state.graphData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <XAxis dataKey='date' />
              <YAxis domain={this.state.totalactivecases} />
              <Area dataKey='totalrecovered' stroke='green' fill='green' />
              <Area dataKey='totaldeceased' stroke='red' fill='red' />
              <Area dataKey='totalconfirmed' stroke='yellow' fill='yellow' />
              <Tooltip />
              <Legend />
            </AreaChart>
          </Row>
        </Col>
      </Col>
    )
  }
}
export default IndiaChartData
