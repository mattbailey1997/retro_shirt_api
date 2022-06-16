import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const UserDisplay = () => {


  const { id } = useParams()

  const [user, setUser] = useState({})
  const [favourites, setFavourites] = useState([])
  const [errors, setErrors] = useState(false)



  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${id}/`)
        setUser(data)
  
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getUser()
  }, [id])

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const { data } = await axios.get(`/api/auth/${id}/`)
        console.log('favourites=>', data.favourites)
        setFavourites(data.favourites)
        console.log(data.favourites)
      } catch (error) {
        console.log(errors)
        setErrors(true)
      }
    }
    getFavourites()
  }, [id])


  return (
    <Container className="favourites">
      <Row>
        {favourites.map(favourite => {
          const { id, name, brand, primary_image } = favourite
          return (
            <Col key={id} md="6" lg="4" className='cheese mb-4'>
              <Card.Img variant="top" src={primary_image} />
              <Card.Title className='text-center mb-0'>{name} - {brand}</Card.Title>
            </Col>
          )
        })}
        
      
      </Row>
    </Container>

  )
}

export default UserDisplay