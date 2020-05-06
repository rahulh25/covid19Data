import React from 'react'
import USAMap from 'react-usa-map'
import { Popover, Card, Overlay, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import './style.css'
export default class USAmapData extends React.Component {
  constructor () {
    super()
    this.state = {
      finalMapData: [],
      showPopup: false,
      currentcases: 0,
      currentState: '',
      setTarget: '',
      currentStateCode: '',
      recovered: '',
      totaldeaths: '',
      totaltest: '',
      lastUpdated: '',
      hopitalized: ''
    }
  }
  mapHandler = event => {
    event.preventDefault()
    return event
  }
  componentDidMount () {
    axios.get('https://covidtracking.com/api/states').then(response => {
      this.setState({ finalMapData: response.data })
    })
  }

  statesCustomConfig = () => {
    let mySet = {}
    this.state.finalMapData.forEach(element => {
      var color = ''
      if (parseInt(element['positive']) <= 1000) {
        color = '#F08080'
      } else if (
        parseInt(element['positive']) > 1000 &&
        parseInt(element['positive']) <= 5000
      ) {
        color = '#CD5C5C'
      } else if (
        parseInt(element['positive']) > 5000 &&
        parseInt(element['positive']) <= 20000
      ) {
        color = '#B22222'
      } else if (parseInt(element['positive']) > 20000) {
        color = '#8B0000'
      }
      mySet[element['state']] = {
        fill: color,
        clickHandler: event => {
          let result = 0
          let recovered = 0
          let totaldeaths = 0
          let totaltest = 0
          let lastUpdated = ''
          let hospitalized = 0
          this.state.finalMapData.filter(entry => {
            if (entry['state'].toString() === event.target.dataset.name) {
              result = entry['positive']
              if (entry['recovered'] === null) {
                recovered = 'N/A'
              } else {
                recovered = entry['recovered']
              }
              if (entry['hospitalized'] === null) {
                hospitalized = 'N/A'
              } else {
                hospitalized = entry['hospitalized']
              }
              totaldeaths = entry['death']
              totaltest = entry['totalTestResults']
              lastUpdated = entry['lastUpdateEt']
            }
            return entry
          })
          this.setState({
            showPopup: !this.state.showPopup,
            currentStateCode: event.target.dataset.name,
            setTarget: event.target,
            currentState: event.target.querySelector('title').innerHTML,
            currentcases: result,
            recovered: recovered,
            totaldeaths: totaldeaths,
            totaltest: totaltest,
            lastUpdated: lastUpdated,
            hospitalized: hospitalized
          })
        }
      }
      return element
    })
    return mySet
  }

  render () {
    let showPopup
    if (this.state.showPopup) {
      showPopup = (
        <div>
          <Overlay
            show={this.state.showPopup}
            target={this.state.setTarget}
            placement='top'
            containerPadding={5}
          >
            <Popover id='popover-basic'>
              <h5 style={{textAlign:'center'}}>{this.state.currentState}</h5>
              <Popover.Content>
                <Row>
                  <i>Total Cases:</i> &nbsp;
                  <p className='text-info'>{this.state.currentcases}</p>
                </Row>
                <Row>
                  <i>Total Deaths:</i>&nbsp;{' '}
                  <p className='text-danger'>{this.state.totaldeaths}</p>
                </Row>
                <Row>
                  <i>Total Recoveries:</i>&nbsp;{' '}
                  <p className='text-success'>{this.state.recovered}</p>
                </Row>
                <Row>
                  <i>Currently Hopitalized:</i>&nbsp;{' '}
                  <p className='text-warning'>{this.state.hospitalized}</p>
                </Row>
                <Row>
                  <i>Last Updated:</i> &nbsp;
                  <p className='text-info'>{this.state.lastUpdated}</p>
                </Row>
              </Popover.Content>
            </Popover>
          </Overlay>
        </div>
      )
    }
    return (
      <div style={{marginTop:'10%'}}>
        <p className='AlignTextLeft'>Click on a state to see total cases</p>
        {showPopup}
        <Col>
          <Row>
            <Card
              style={{
                width: '10rem',
                backgroundColor: '#D3D3D3',
                marginLeft: '20px',
                height: '12rem'
              }}
            >
              <Card.Body>
                <Row>
                  <span
                    className='dot'
                    style={{ backgroundColor: '#F08080' }}
                  ></span>
                  <p className='AlignTextLeft'>0-1000</p>
                </Row>
                <Row>
                  <span
                    className='dot'
                    style={{ backgroundColor: '#CD5C5C' }}
                  ></span>
                  <p className='AlignTextLeft'>1000-5000</p>
                </Row>
                <Row>
                  <span
                    className='dot'
                    style={{ backgroundColor: '#B22222' }}
                  ></span>
                  <p className='AlignTextLeft'>5000-20000</p>
                </Row>
                <Row>
                  <span
                    className='dot'
                    style={{ backgroundColor: '#8B0000' }}
                  ></span>
                  <p className='AlignTextLeft'> >20000</p>
                </Row>
              </Card.Body>
            </Card>

            <USAMap
              customize={this.statesCustomConfig()}
              onClick={this.mapHandler}
            />
          </Row>
        </Col>
      </div>
    )
  }
}
