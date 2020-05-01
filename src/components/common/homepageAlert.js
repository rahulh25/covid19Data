import React from 'react'
import { Col, Alert } from 'react-bootstrap'

const HomepageAlert = props => {
  return (
    <Col>
      <Alert variant={props.variant} className='AlignTextCenter'>
        <b>{props.heading}</b>
        <p className='increaseTextSize'>{props.data}</p>
      </Alert>
    </Col>
  )
}
export default HomepageAlert
