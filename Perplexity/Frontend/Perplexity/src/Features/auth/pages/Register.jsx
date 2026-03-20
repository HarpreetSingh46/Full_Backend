import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    setSuccess('')

    try {
      // Validation
      if (formData.username.length < 3) {
        throw new Error('Username must be at least 3 characters long')
      }
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Add your register API call here
      console.log('Register attempt:', formData)
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (!response.ok) throw new Error('Registration failed')
      
      setSuccess('Account created successfully! Redirecting to login...')
      setFormData({ username: '', email: '', password: '' })
      // setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-gray-800 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-gray-700'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-pink-500 bg-clip-text text-transparent mb-2'>
              Create Account
            </h1>
            <p className='text-gray-400 text-sm'>Join us today and get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg'>
              <p className='text-red-400 text-sm'>{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className='mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg'>
              <p className='text-green-400 text-sm'>{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Username Field */}
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-300 mb-2'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
                placeholder='Choose a username'
                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition'
              />
              <p className='text-gray-500 text-xs mt-1'>Minimum 3 characters</p>
            </div>

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
              <p className='text-gray-500 text-xs mt-1'>Minimum 6 characters</p>
            </div>

            {/* Terms Agreement */}
            <div className='flex items-start gap-2'>
              <input
                type='checkbox'
                id='terms'
                required
                className='mt-1 w-4 h-4 accent-red-500 bg-gray-700 border border-gray-600 rounded cursor-pointer'
              />
              <label htmlFor='terms' className='text-gray-400 text-xs'>
                I agree to the{' '}
                <Link to='/terms' className='text-red-400 hover:text-red-300 transition'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to='/privacy' className='text-red-400 hover:text-red-300 transition'>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-2 px-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/50'
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className='my-6 flex items-center gap-4'>
            <div className='flex-1 h-px bg-gray-700'></div>
            <span className='text-gray-500 text-sm'>or</span>
            <div className='flex-1 h-px bg-gray-700'></div>
          </div>

          {/* Sign In Link */}
          <p className='text-center text-gray-400 text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='text-red-400 hover:text-red-300 font-medium transition'>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
