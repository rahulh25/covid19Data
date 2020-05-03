import React from 'react'
import axios from 'axios'
import { Container, Row, Card } from 'react-bootstrap'
import HomepageAlert from '../common/homepageAlert'
import LeafletMap from './map/globalmaps/leafletMap'

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
      CountryData: [],
      headingFirst: 'Total Cases',
      headingSecond: 'Total Deaths',
      headingThird: 'Total Recovered',
      headingFourth: 'New Cases',
      headingFifth: 'New Deaths',
      headingSixth: 'Active Cases',
      headingSeventh: 'Critical Cases',
      dangerVariant: 'danger',
      successVariant: 'success',
      infoVariant: 'info',
      warningVariant: 'warning'
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
          CriticalCases: response.data[0]['critical']
        })
        axios.get('https://corona.lmao.ninja/v2/countries').then(response => {
          response.data.sort((r1, r2) => {
            if (r1.cases > r2.cases) return -1
            if (r1.votes < r2.votes) return 1
            return 0
          })
          this.setState({
            CountryData: response.data
          })
        })
      })
  }
  render () {
    return (
      <div style={{ marginTop: '5px' }}>
        <Container fluid='lg' id='globalData'>
          <Card>
            <h2 className='AlignTextCenter cardbackgroundcolor'>GLOBAL DATA</h2>
            <Card.Body className='backgroundcolorforpage'>
              <Row>
                <HomepageAlert
                  variant={this.state.dangerVariant}
                  heading={this.state.headingFirst}
                  data={this.state.TotalConfirmed}
                />
                <HomepageAlert
                  variant={this.state.dangerVariant}
                  heading={this.state.headingSecond}
                  data={this.state.TotalDeaths}
                />
                <HomepageAlert
                  variant={this.state.successVariant}
                  heading={this.state.headingThird}
                  data={this.state.TotalRecovered}
                />
              </Row>
              <Row>
                <HomepageAlert
                  variant={this.state.infoVariant}
                  heading={this.state.headingFourth}
                  data={this.state.NewConfirmed}
                />
                <HomepageAlert
                  variant={this.state.infoVariant}
                  heading={this.state.headingFifth}
                  data={this.state.NewDeaths}
                />
                <HomepageAlert
                  variant={this.state.warningVariant}
                  heading={this.state.headingSixth}
                  data={this.state.ActiveCases}
                />
                <HomepageAlert
                  variant={this.state.warningVariant}
                  heading={this.state.headingSeventh}
                  data={this.state.CriticalCases}
                />
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <hr></hr>
        <h2 className='AlignTextCenter'>World Map</h2>
        <div id='mapData'>
          <LeafletMap props={this.state.CountryData} />
        </div>
      </div>
    )
  }
}

export default GlobalData
