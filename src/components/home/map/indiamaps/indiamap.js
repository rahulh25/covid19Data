import React from 'react'
import INDIA from '@svg-maps/india'
import { RadioSVGMap } from 'react-svg-map'
import './index.css'
import { Popover, Overlay, Row, Col } from 'react-bootstrap'
import axios from 'axios'

class IndiaMap extends React.Component {
  constructor () {
    super()
    this.state = {
      indiaData: [],
      showPopup: false,
      currentState: '',
      setTarget: '',
      currentcases: '',
      newDeaths: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      newrecovered: 0,
      newcases: 0,
      active: 0,
      dateofdata: ''
    }
  }
  componentDidMount () {
    axios.get('https://api.covid19india.org/data.json').then(response => {
      this.setState({ indiaData: response.data['statewise'].slice(1) })
    })
    let today = new Date()
    this.setState({
      dateofdata:
        today.getMonth() +
        1 +
        '/' +
        today.getDate() +
        '/' +
        today.getFullYear().toString()
    })
  }
  showPopup = e => {
    e.preventDefault()
    let result = 0
    let newDeaths = 0
    let totalDeaths = 0
    let totalRecovered = 0
    let newrecovered = 0
    let newcases = 0
    let active = 0
    this.state.indiaData.filter(entry => {
      console.log(
        entry['statecode'].toString().toLowerCase() ===
          e.target
            .getAttribute('id')
            .toString()
            .toLowerCase()
      )
      if (
        entry['statecode'].toString().toLowerCase() ===
        e.target
          .getAttribute('id')
          .toString()
          .toLowerCase()
      ) {
        result = entry['confirmed']
        newDeaths = entry['deltadeaths']
        totalDeaths = entry['deaths']
        totalRecovered = entry['recovered']
        newrecovered = entry['deltarecovered']
        newcases = entry['deltaconfirmed']
        active = entry['active']
      }
    })

    this.setState({
      showPopup: !this.state.showPopup,
      currentState: e.target.getAttribute('aria-label').toString(),
      setTarget: e.target,
      currentcases: result,
      newDeaths: newDeaths,
      totalDeaths: totalDeaths,
      totalRecovered: totalRecovered,
      newrecovered: newrecovered,
      newcases: newcases,
      active: active
    })
  }
  removepop = e => {
    e.preventDefault()
    this.setState({
      showPopup: !this.state.showPopup,
      currentState: '',
      setTarget: '',
      currentcases: '',
      newDeaths: 0,
      totalDeaths: 0,
      totalRecovered: 0,
      newrecovered: 0,
      newcases: 0,
      active: 0
    })
  }
  render () {
    let showPopup
    if (this.state.showPopup) {
      showPopup = (
        <div>
          <Overlay
            show={this.state.showPopup}
            target={this.state.setTarget}
            placement='bottom'
            containerPadding={20}
          >
            <Popover id='popover-basic'>
              <Popover.Title as='h3'>{this.state.currentState}</Popover.Title>
              <Popover.Content id='popover-content'>
                <Row>
                  <i>Total Cases:</i> &nbsp;
                  <p className='text-danger'>{this.state.currentcases}</p>
                </Row>
                <Row>
                  <i>Total Deaths:</i>&nbsp;{' '}
                  <p className='text-danger'>{this.state.totalDeaths}</p>
                </Row>
                <Row>
                  <i>Total Recoveries:</i>&nbsp;{' '}
                  <p className='text-success'>{this.state.totalRecovered}</p>
                </Row>
                <Row>
                  <i>New Cases:</i> &nbsp;
                  <p className='text-info'>{this.state.newcases}</p>
                </Row>
                <Row>
                  <i>New Deaths:</i>&nbsp;{' '}
                  <p className='text-danger'>{this.state.newDeaths}</p>
                </Row>
                <Row>
                  <i>New Recovered:</i>&nbsp;{' '}
                  <p className='text-success'>{this.state.newrecovered}</p>
                </Row>
                <Row>
                  <i>Active Cases:</i>&nbsp;
                  <p className='text-warning'>{this.state.active}</p>
                </Row>
              </Popover.Content>
            </Popover>
          </Overlay>
        </div>
      )
    }
    return (
      <Col>
        <h2 className='AlignTextCenter' style={{ marginTop: '5px' }}>
          INDIA
        </h2>
        <p className='AlignTextLeft'>Hover over a state to see more data</p>
        <p className='AlignTextLeftwithoutBold'>
          Data as of :&nbsp;{this.state.dateofdata}
        </p>
        {showPopup}
        <RadioSVGMap
          map={INDIA}
          onLocationMouseOver={e => this.showPopup(e)}
          onLocationMouseOut={e => this.removepop(e)}
        />
      </Col>
    )
  }
}

export default IndiaMap
