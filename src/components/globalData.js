import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Alert, Card } from 'react-bootstrap'
import CountryData from './countryData'
import ChartData from './chartData'

class GlobalData extends React.Component {
  constructor () {
    super()
    this.state = {
      NewConfirmed: 0,
      TotalConfirmed: 0,
      NewDeaths: 0,
      TotalDeaths: 0,
      NewRecovered: 0,
      TotalRecovered: 0,
      ActiveCases: 0,
      CriticalCases: 0,
      CountryData: []
    }
  }
  componentDidMount () {
    axios
      .get('https://coronavirus-19-api.herokuapp.com/countries')
      .then(response => {
        this.setState({
          NewConfirmed: response.data[0]['todayCases'],
          TotalConfirmed: response.data[0]['cases'],
          NewDeaths: response.data[0]['todayDeaths'],
          TotalDeaths: response.data[0]['deaths'],
          TotalRecovered: response.data[0]['recovered'],
          ActiveCases: response.data[0]['active'],
          CriticalCases: response.data[0]['critical'],
          CountryData: response.data
        })
      })
  }
  render () {
    return (
      <div style={{marginTop:'5px'}}>
        <Container fluid='lg' id='globalData'>
          <Card>
            <h2 className='AlignTextCenter cardbackgroundcolor'>GLOBAL DATA</h2>
            <Card.Body className='backgroundcolorforpage'>
              <Row>
                <Col>
                  <Alert variant='danger' className='AlignTextCenter'>
                    <b>Total Cases</b>
                    <p className='increaseTextSize'>
                      {this.state.TotalConfirmed}
                    </p>
                  </Alert>
                </Col>

                <Col>
                  <Alert variant='danger' className='AlignTextCenter'>
                    <b>Total Deaths</b>
                    <p className='increaseTextSize'>{this.state.TotalDeaths}</p>
                  </Alert>
                </Col>
                <Col>
                  <Alert variant='success' className='AlignTextCenter'>
                    <b>Total Recovered</b>
                    <p className='increaseTextSize'>
                      {this.state.TotalRecovered}
                    </p>
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Alert variant='info' className='AlignTextCenter'>
                    <b>New Cases</b>
                    <p className='increaseTextSize'>
                      {this.state.NewConfirmed}
                    </p>
                  </Alert>
                </Col>
                <Col>
                  <Alert variant='info' className='AlignTextCenter'>
                    <b>New Deaths</b>
                    <p className='increaseTextSize'>{this.state.NewDeaths}</p>
                  </Alert>
                </Col>
                <Col>
                  <Alert variant='warning' className='AlignTextCenter'>
                    <b>Active Cases</b>
                    <p className='increaseTextSize'>{this.state.ActiveCases}</p>
                  </Alert>
                </Col>
                <Col>
                  <Alert variant='warning' className='AlignTextCenter'>
                    <b>Critical Cases</b>
                    <p className='increaseTextSize'>
                      {this.state.CriticalCases}
                    </p>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <hr></hr>
        <div style={{ width: '100%' }} id='countryData'>
          <h2 className='AlignTextCenter cardbackgroundcolor'>COUNTRYWISE DATA</h2>
          <p className='AlignTextLeft text-primary'>Click on a row to see more data</p>
          <CountryData props={this.state.CountryData} />
        </div>
        <hr></hr>
        <div id='graphData'>
          <h2 className='AlignTextCenter cardbackgroundcolor'>Graphs</h2>
          <ChartData props={this.state.CountryData} />
        </div>
      </div>
    )
  }
}

export default GlobalData
