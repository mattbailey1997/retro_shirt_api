import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ShirtList from './ShirtList'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Filter from './Filter'

const ShirtIndex = () => {

  const [shirts, setShirts] = useState([])
  const [leagues, setLeagues] = useState([])
  const [brands, setBrands] = useState([])
  const [filteredShirts, setFilteredShirts] = useState([])
  const [filters, setFilters] = useState({
    league: 'All',
    searchTerm: '',
  })

  useEffect(() => {
    const getShirts = async () => {
      try {
        const { data } = await axios.get('api/shirts')
        setShirts(data)

      } catch (err) {
        console.log(err)
      }
    }
    getShirts()
  }, [])

  const handleChange = (e) => {
    console.log(e.target.value)
    const newObj = {
      ...filters,
      [e.target.name]: e.target.value,
    }
    setFilters(newObj)
  }


  // Use effect that creates our regional dropdown options
  useEffect(() => {

    if (shirts.length) {
      const leagueList = []
      shirts.forEach(shirt => leagueList.includes(shirt.league) ? '' : leagueList.push(shirt.league))
      setLeagues(leagueList)
    }
  }, [shirts])

  //Filter brands

  useEffect(() => {
    if (shirts.length) {
      const brandslist = []
      shirts.forEach(shirt => brandslist.includes(shirt.brand) ? '' : brandslist.push(shirt.brand))
      setBrands(brandslist)
    }
  }, [shirts])

  // use effect 
  useEffect(() => {
    //Only filter countries if there are countries to filter
    if (shirts.length) {
      const regexSearch = new RegExp(filters.searchTerm, 'i')

      const filtered = shirts.filter(shirt => {
        return regexSearch.test(shirt.name) && (shirt.league === filters.league || filters.league === 'All') && (shirt.brand === filters.brand || filters.brand === 'All')
      })
      setFilteredShirts(filtered)
    }
  }, [filters, shirts])





  return (
    <main className='whole-index'>
      <div className='allFilters'>
        <h1>Filters</h1>
        {/* Search Field */}
        <h2>Search</h2>
        <Container className='searchField'>
          <input type="text" name="searchTerm" placeholder='Search...' value={filters.searchTerm} onChange={handleChange} />
        </Container>

        {/* Filter Leagues*/}
        <h2>Filter by League</h2>
        <Container className='filter-league'>
          <select name="league" value={filters.league} onChange={handleChange}>
            <option value='All'>All</option>
            {leagues.map(league => <option key={league} value={league}>{league}</option>)}
          </select>
        </Container>

        <Container className='filter-brand'>
          <h2>Filter by brand</h2>
          <select name='brand' value={filters.brand} onChange={handleChange}>
            <option value='All'>All</option>
            {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </Container>
      </div>

      {/* Shirt List View */}
      <Container className='shirt-list'>
        <Row>
          {(filteredShirts.length ? filteredShirts : shirts).map(shirt => {
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

    </main >
  )

}

export default ShirtIndex