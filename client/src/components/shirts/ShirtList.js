import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

const ShirtList = ({ shirts }) => {



  <Container className='shirt-list'>
    <Row>
      {shirts.map(shirt => {
        console.log(shirt)
        const { id, name, primary_image, description } = shirt
        return (
          <Card key={id}>
            <div className="card mb-3 card-index">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <Card.Img src={primary_image}></Card.Img>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <Link to={`/shirts/${id}/`} className='btn btn-warning'> View </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </Row>
  </Container>
}

export default ShirtList