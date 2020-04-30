import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, {
  textFilter,
  numberFilter
} from 'react-bootstrap-table2-filter'
import { Card, Row, Col } from 'react-bootstrap'

const CountryData = props => {
  const columns = [
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
      filter: numberFilter(),
      classes: 'text-danger'
    },
    {
      dataField: 'deaths',
      text: 'Total Deaths',
      sort: true,
      filter: numberFilter(),
      classes: 'text-danger'
    },
    {
      dataField: 'recovered',
      text: 'Total Recovered',
      sort: true,
      filter: numberFilter(),
      classes: 'text-success'
    },
    {
      dataField: 'todayCases',
      text: 'New Cases',
      sort: true,
      filter: numberFilter(),
      classes: 'text-info'
    },
    {
      dataField: 'todayDeaths',
      text: 'New Deaths',
      sort: true,
      filter: numberFilter(),
      classes: 'text-info'
    }
  ]
  const expandRow = {
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
                {row.totalTests}
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
  return (
    <BootstrapTable
      data={props.props.slice(1)}
      columns={columns}
      keyField='country'
      filter={filterFactory()}
      filterPosition='top'
      classes='textsizefortable'
      hover={true}
      expandRow={expandRow}
    />
  )
}
export default CountryData
