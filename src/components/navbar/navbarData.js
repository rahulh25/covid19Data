import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, animateScroll as scroll } from 'react-scroll'
const scrollToTop=()=> {
  scroll.scrollToTop();
}
class NavBarData extends React.Component {
  
  render () {
    return (
      <Navbar bg='dark' expand='lg' variant='dark' sticky='top'>
        <Navbar.Brand href='#'>COVID19 DATA</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <div className='nav-item'>
              <Link
                activeClass='active'
                to='globalData'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Global Data
              </Link>
            </div>
            <div className='nav-item'>
              <Link
                activeClass='active'
                to='countryData'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Countrywise data
              </Link>
            </div>
            <div className='nav-item'>
              <Link
                activeClass='active'
                to='graphData'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Graphs
              </Link>
            </div>
            <div className='nav-item'>
              <Link
                activeClass='active'
                to='mapData'
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Map
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <button onClick={scrollToTop} className='btn btn-link'>To the top!</button>
      </Navbar>
      
    )
  }
}
export default NavBarData
