import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from '../Features/auth/pages/Login'
import Register from '../Features/auth/pages/Register'

export  const router = createBrowserRouter([
    {
        path :"/login",
        element : <Login/>
    },
    {
        path :"/register",
        element : <Register/>
    }
])