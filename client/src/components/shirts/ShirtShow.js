import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'



import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom'

const ShirtShow = () => {

  const { id } = useParams()

  const [ shirt, setShirt ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  


  useEffect(() => {
    const getShirt = async () => {
      try {
        const { data } = await axios.get(`/api/shirts/${id}/`)
        setShirt(data)
        console.log(data)
      } catch (errors) {
        console.log(errors)
        setErrors(true)
      }
    }
    getShirt()
  }, [id])

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`api/users/${id}/`)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   const getReviews = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/shirts/${id}/`)
  //       setReviews(data.reviews)
  //     } catch (error) {
  //       console.log(errors)
  //       setErrors(true)
  //     }
  //   }
  //   getReviews()
  // }, [id])


  // const deleteReview = async () => {
  //   try {

  //     await axios.delete(`api/reviews/${id}/`)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }





  return (

    <Container className="mt-4">
      <Row>
        {shirt ?
          <>
            <Carousel interval={null}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={shirt.primary_image}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={shirt.image_two}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={shirt.image_three}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>

            <Col md="6">
              <img src={shirt.primary_image} alt={shirt.name} />
            </Col>
            <Col md="6">
              <h4><span></span></h4>
              <p>{shirt.description}</p>
              <hr />
              <h4><span>🌍</span>Origin</h4>
              <p>{shirt.brand}</p>
              <hr />
              <hr />
              <Link to="/shirts" className='btn btn-warning'>Back to shirts</Link>
            </Col>
          </>
          :
          <h2 className='text-center'>
          </h2>
        }
        <button >Add to favourites</button>
        <button>Remove from favourites</button>

        {/* <h2>Reviews</h2>
        {reviews.map(review => {
          const { id, text } = review
          return (
            <>
              <h3 key={id}>{text}</h3>
              <Button variant="danger" onClick={deleteReview}>Delete Review</Button>
            </>
          )

        })} */}

      </Row>
    </Container>
  )
}

export default ShirtShow