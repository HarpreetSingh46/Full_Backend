import axios from "axios"
const CartApiInstance = axios.create({
    baseURL: "/api/cart",
   withCredentials:true,
})

export const addItem = async ({ productId, variantId, quantity }) => {
  const response = await CartApiInstance.post(
    `/add`,
    { productId, variantId, quantity } 
  )
  return response.data;
}