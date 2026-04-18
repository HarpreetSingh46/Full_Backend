import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/userproduct'
const Home = () => {
  const products = useSelector((state) => state.product.products)
  const {handleGetAllProducts} = useProduct()
  console.log(products)
  useEffect(() => {
    handleGetAllProducts()
  }, [])
  return (

    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
