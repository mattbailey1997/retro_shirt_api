import axios from 'axios'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState(false)

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('retro-shirt-final-db', token)
  }


  // ? Submit request
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      navigate('/shirts')
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  // ? Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }





  return (
    <section className="form-page">
      <Container>
        <Row>
          {/* Email */}
          <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-4' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
            {errors.email && <p className='text-danger'>{errors.email}</p>}
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="text" name="password" className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
            {errors.password && <p className='text-danger'>{errors.password}</p>}
            <button type="submit" className='btn btn-warning w-100'>Login</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}

export default Login