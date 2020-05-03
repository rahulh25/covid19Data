import React from 'react'
import USAMap from 'react-usa-map'
import * as d3 from 'd3'
import { Popover, Card, Overlay, Row, Col } from 'react-bootstrap'
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
      dateofdata: ''
    }
  }
  mapHandler = event => {
    event.preventDefault()
    return event
  }
  componentDidMount () {
    var mapData = []
    let today = new Date()
    today.setDate(today.getDate() - 1)
    let date =
      today.getMonth() +
      1 +
      '/' +
      today.getDate() +
      '/' +
      today
        .getFullYear()
        .toString()
        .substr(-2)
    this.setState({
      dateofdata:
        today.getMonth() +
        1 +
        '/' +
        today.getDate() +
        '/' +
        today
          .getFullYear()
          .toString()
    })
    d3.csv(
      'https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_confirmed_usafacts.csv'
    ).then(data => {
      let finalData = d3
        .nest()
        .key(function (d) {
          return d['State']
        })
        .rollup(function (d) {
          return d3.sum(d, function (g) {
            return g[date.toString()]
          })
        })
        .entries(data)
      finalData.forEach(data => {
        mapData.push(data)
        return data
      })
      this.setState({ finalMapData: mapData })
    })
  }

  statesCustomConfig = () => {
    let mySet = {}
    this.state.finalMapData.forEach(element => {
      var color = ''
      if (parseInt(element['value']) < 500) {
        color = '#28a745'
      } else if (
        parseInt(element['value']) > 500 &&
        parseInt(element['value']) < 5000
      ) {
        color = '#007bff'
      } else if (
        parseInt(element['value']) > 5000 &&
        parseInt(element['value']) < 20000
      ) {
        color = '#ffc107'
      } else if (parseInt(element['value']) > 20000) {
        color = '#dc3545'
      }
      mySet[element['key']] = {
        fill: color,
        clickHandler: event => {
          let result = 0
          this.state.finalMapData.filter(entry => {
            if (entry['key'].toString() === event.target.dataset.name) {
              result = entry['value']
            }
            return entry
          })
          this.setState({
            showPopup: !this.state.showPopup,
            currentStateCode: event.target.dataset.name,
            setTarget: event.target,
            currentState: event.target.querySelector('title').innerHTML,
            currentcases: result
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
            containerPadding={20}
          >
            <Popover id='popover-basic'>
              <Popover.Title as='h3'>{this.state.currentState}</Popover.Title>
              <Popover.Content>
                Total Cases: &nbsp;{this.state.currentcases}
              </Popover.Content>
            </Popover>
          </Overlay>
        </div>
      )
    }
    return (
      <div>
        <h2 className='AlignTextCenter' style={{ marginTop: '5px' }}>
          USA
        </h2>
        <p className='AlignTextLeft'>Click on a state to see total cases</p>
        <p className='AlignTextLeftwithoutBold'>Data as of :&nbsp;{this.state.dateofdata}</p>
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
                    style={{ backgroundColor: '#28a745' }}
                  ></span>
                  <p className='AlignTextLeft'>0-500</p>
                </Row>
                <Row>
                  <span
                    className='dot'
                    style={{ backgroundColor: '#007bff' }}
                  ></span>
                  <p className='AlignTextLeft'>500-5000</p>
                </Row>
                <Row>
                  <span
                    className='dot'
                    style={{ backgroundColor: '#ffc107' }}
                  ></span>
                  <p className='AlignTextLeft'>5000-20000</p>
                </Row>
                <Row>
                  <span
                    className='dot'
                    style={{ backgroundColor: '#dc3545' }}
                  ></span>
                  <p className='AlignTextLeft'>>20000</p>
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
