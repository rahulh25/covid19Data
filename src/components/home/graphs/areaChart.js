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
import axios from 'axios'

class AreaChartData extends React.Component {
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
          casesPerOneMillion: d.casesPerOneMillion,
          deathsPerOneMillion: d.deathsPerOneMillion,
          testsPerOneMillion: d.testsPerOneMillion,
          test: d.tests
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
          Cases/Deaths/Tests per million in Top 15 worst effected countries (by
          number of cases)
        </h5>
        <br></br>
        <Row>
          <AreaChart
            width={1000}
            height={500}
            data={this.state.graphData}
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
}
export default AreaChartData
