import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import USAmapData from '../src/components/home/map/usmaps/usmapData'
//import IndiaHeatMap from './components/home/map/indiamaps/indiamap'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import AreaChartData from '../src/components/home/graphs/areaChart'
import BarChartData from '../src/components/home/graphs/barChart'
import ChartData from '../src/components/home/graphs/linechart'
import CountryData from '../src/components/home/countryData'
import IndiaChartData from '../src/components/home/graphs/indiacharts/indiaCharts'
import IndiaHeatMap from '../src/components/home/map/indiamaps/indiaHeatMap'
const routing = (
  <Router>
    <Navbar bg='dark' expand='lg' variant='dark' sticky='top'>
      <Navbar.Brand href='/'>COVID19 DATA</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <div className='nav-item'>
            <Link to='/'>Home</Link>
          </div>
          <div className='nav-item'>
            <Link to='/countrywisedata'>Countrywise Data</Link>
          </div>
          <NavDropdown title='Graphs' id='basic-nav-dropdown'>
            <li className='dropdown-item'>
              <Link to='/top15countriescasespermillion'>Cases Per Million</Link>
            </li>
            <li className='dropdown-item'>
              <Link to='/top15countriescasestests'>Total tests</Link>
            </li>
            <li className='dropdown-item'>
              <Link to='/top15countriescases'>
                Total Cases/Deaths/Recoveries
              </Link>
            </li>
          </NavDropdown>
          <NavDropdown title='USA' id='basic-nav-dropdown'>
            <li className='dropdown-item'>
              <Link to='/usamap'>Map</Link>
            </li>
          </NavDropdown>
          <NavDropdown title='India' id='basic-nav-dropdown'>
            <li className='dropdown-item'>
              <Link to='/indiamap'>Map</Link>
            </li>
            <li className='dropdown-item'>
              <Link to='/indiagraphs'>Graphs</Link>
            </li>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Route exact path='/' component={App} />
    <Route path='/usamap' component={USAmapData} />
    <Route path='/indiamap' component={IndiaHeatMap} />
    <Route path='/top15countriescasespermillion' component={AreaChartData} />
    <Route path='/top15countriescases' component={ChartData} />
    <Route path='/top15countriescasestests' component={BarChartData} />
    <Route path='/countrywisedata' component={CountryData} />
    <Route path='/indiagraphs' component={IndiaChartData} />
  </Router>
)

ReactDOM.render(
  <React.StrictMode>{routing}</React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
