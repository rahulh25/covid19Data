import React from 'react'
import './App.css'
import GlobalData from './components/home/globalData'
import NavBarData from './components/navbar/navbarData'
function App () {
  return (
    <div className='App' style={{marginTop:"5px"}}>
      <NavBarData/>
      <GlobalData />
    </div>
  )
}

export default App
