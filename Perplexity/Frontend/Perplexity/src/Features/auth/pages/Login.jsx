import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Add your login API call here
      console.log('Login attempt:', formData)
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (!response.ok) throw new Error('Login failed')
      setFormData({ email: '', password: '' })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-gray-800 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-700'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-pink-500 bg-clip-text text-transparent mb-2'>
              Welcome Back
            </h1>
            <p className='text-gray-400 text-sm'>Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg'>
              <p className='text-red-400 text-sm'>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Email Field */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='you@example.com'
                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition'
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='••••••••'
                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition'
              />
            </div>

            {/* Forgot Password Link */}
            <div className='text-right'>
              <Link to='/forgot-password' className='text-sm text-red-400 hover:text-red-300 transition'>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-2 px-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/50'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className='my-6 flex items-center gap-4'>
            <div className='flex-1 h-px bg-gray-700'></div>
            <span className='text-gray-500 text-sm'>or</span>
            <div className='flex-1 h-px bg-gray-700'></div>
          </div>

          {/* Sign Up Link */}
          <p className='text-center text-gray-400 text-sm'>
            Don't have an account?{' '}
            <Link to='/register' className='text-red-400 hover:text-red-300 font-medium transition'>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
