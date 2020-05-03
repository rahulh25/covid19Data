import React from 'react'
import USA from '@svg-maps/usa.counties'
import { RadioSVGMap } from 'react-svg-map'
import '../index.css'
import * as d3 from 'd3'
import { Popover, Overlay } from 'react-bootstrap'

class USACountyData extends React.Component {
  constructor () {
    super()
    this.state = {
      countyWiseData: [],
      showPopup: false,
      currentcases: 0,
      currentCounty: '',
      setTarget: '',
      dateofdata: ''
    }
  }
  componentDidMount () {
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
        today.getFullYear().toString()
    })
    d3.csv(
      'https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_confirmed_usafacts.csv'
    ).then(data => {
      let finalData = []
      data.map(d => {
        finalData.push({
          State: d['State'],
          TotalCount: d[date.toString()],
          CountyName: d['County Name'].toString().split(' County')[0]
        })
      })
      this.setState({ countyWiseData: finalData })
    })
  }

  showPopup = e => {
    e.preventDefault()
    let result = 0
    this.state.countyWiseData.filter(entry => {
      if (
        entry['CountyName'] ===
        e.target
          .getAttribute('aria-label')
          .toString()
          .split(',')[0]
      ) {
        result = entry['TotalCount']
      }
    })
    this.setState({
      showPopup: !this.state.showPopup,
      currentCounty: e.target
        .getAttribute('aria-label')
        .toString()
        .split(',')[0],
      setTarget: e.target,
      currentcases: result
    })
  }
  removepop = e => {
    e.preventDefault()
    this.setState({
      showPopup: !this.state.showPopup,
      currentCounty: '',
      setTarget: '',
      currentcases: ''
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
              <Popover.Title as='h3'>{this.state.currentCounty}</Popover.Title>
              <Popover.Content>
                Total Cases: &nbsp; {this.state.currentcases}
              </Popover.Content>
            </Popover>
          </Overlay>
        </div>
      )
    }
    return (
      <div>
        <h2 className='AlignTextCenter' style={{ marginTop: '5px' }}>
          USA County
        </h2>
        <p className='AlignTextLeft'>Hover over a county to see total cases</p>
        <p className='AlignTextLeftwithoutBold'>
          Data as of : &nbsp;{this.state.dateofdata}
        </p>
        {showPopup}
        <RadioSVGMap
          map={USA}
          onLocationMouseOver={e => this.showPopup(e)}
          onLocationMouseOut={e => this.removepop(e)}
        />
      </div>
    )
  }
}

export default USACountyData
