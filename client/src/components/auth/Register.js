import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Register = () => {
  
  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [ errors, setErrors ] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }
  
  const handleSubmit = async (event) => {

    event.preventDefault()
    try {
      
      await axios.post('/api/auth/register/', formData)

      navigate('/login')
    } catch (error) {
      console.log(error)
      console.log(error.response)
      console.log(error.response.data.errors)
    }
  }
  
  return (
    <section className="form-page">
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-6 offset-md-3 mt-4' onSubmit={handleSubmit}>
            <h1>Register</h1>
            
            {/* First Name */}
            <label htmlFor='first_name'>First Name</label>
            <input type="text" name="first_name" className='input' placeholder='First Name' value={formData.first_name} onChange={handleChange}/>
            {errors.first_name && <p className='text-danger'>{errors.first_name}</p>}

            {/* Last Name */}
            <label htmlFor='last_name'>Last Name</label>
            <input type="text" name="last_name" className='input' placeholder='Last Name' value={formData.last_name} onChange={handleChange}/>
            {errors.last_name && <p className='text-danger'>{errors.last_name}</p>}


            {/* Usernam */}
            <label htmlFor='username'>Username</label>
            <input type="text" name="username" className='input' placeholder='Username' value={formData.username} onChange={handleChange}/>
            {errors.username && <p className='text-danger'>{errors.username}</p>}
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className='input' placeholder='Email' value={formData.email} onChange={handleChange}/>
            {errors.email && <p className='text-danger'>{errors.email}</p>}
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="text" name="password" className='input' placeholder='Password' value={formData.password} onChange={handleChange}/>
            {errors.password && <p className='text-danger'>{errors.password}</p>}
            {/* PasswordConfirmation */}
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input type="password" name="password_confirmation" className="input" placeholder="Password Confirmation" value={formData.password_confirmation} onChange={handleChange}/>
            {errors.password_confirmation && <p className='text-danger'>{errors.password_confirmation}</p>}
            {/* Submit */}
            <button type='submit' className='btn btn-danger'>Register</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}

export default Register