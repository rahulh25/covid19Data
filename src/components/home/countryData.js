import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import { Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class CountryData extends React.Component {
  constructor () {
    super()
    this.state = { countryData: [] }
  }
  componentDidMount () {
    axios.get('https://corona.lmao.ninja/v2/countries').then(response => {
      response.data.sort((r1, r2) => {
        if (r1.cases > r2.cases) return -1
        if (r1.votes < r2.votes) return 1
        return 0
      })
      this.setState({
        countryData: response.data
      })
    })
  }
  columns = [
    {
      dataField: 'country',
      text: 'Country',
      sort: true,
      filter: textFilter()
    },
    {
      dataField: 'cases',
      text: 'Total Cases',
      sort: true,
      classes: 'text-danger'
    },
    {
      dataField: 'deaths',
      text: 'Total Deaths',
      sort: true,
      classes: 'text-danger'
    },
    {
      dataField: 'recovered',
      text: 'Total Recovered',
      sort: true,
      classes: 'text-success'
    },
    {
      dataField: 'todayCases',
      text: 'New Cases',
      sort: true,
      classes: 'text-info'
    },
    {
      dataField: 'todayDeaths',
      text: 'New Deaths',
      sort: true,
      classes: 'text-info'
    }
  ]
  expandRow = {
    renderer: row => (
      <Card>
        <h4 className='AlignTextCenter'>{row.country.toUpperCase()}</h4>
        <Card.Body>
          <Row>
            <Col>
              <label htmlFor='activecases'>Active Cases</label>
              <p id='activecases' className='text-warning'>
                {row.active}
              </p>
            </Col>
            <Col>
              <label htmlFor='criticalCases'>Critical cases</label>
              <p id='criticalCases' className='text-danger'>
                {row.critical}
              </p>
            </Col>
            <Col>
              <label htmlFor='casespermillion'>Cases per million</label>
              <p id='casespermillion' className='text-danger'>
                {row.casesPerOneMillion}
              </p>
            </Col>
            <Col>
              <label htmlFor='deathpermillion'>Deaths Per million</label>
              <p id='deathpermillion' className='text-danger'>
                {row.deathsPerOneMillion}
              </p>
            </Col>
            <Col>
              <label htmlFor='totaltest'>Total Tests</label>
              <p id='totaltest' className='text-info'>
                {row.tests}
              </p>
            </Col>
            <Col>
              <label htmlFor='testspermillion'>Tests per million</label>
              <p id='testspermillion' className='text-info'>
                {row.testsPerOneMillion}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ),
    nonExpandable: [1]
  }
  render () {
    return (
      <div>
        <h2 className='AlignTextCenter'>
          COUNTRYWISE DATA
        </h2>
        <p className='AlignTextLeft'>Click on a row to see more data</p>
        <BootstrapTable
          data={this.state.countryData}
          columns={this.columns}
          keyField='country'
          filter={filterFactory()}
          filterPosition='top'
          classes='textsizefortable'
          hover={true}
          expandRow={this.expandRow}
        />
      </div>
    )
  }
}
export default CountryData
