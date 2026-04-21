import axios from "axios"
const CartApiInstance = axios.create({
    baseURL: "/api/cart",
   withCredentials:true,
})

export const addItem = async ({ productId, variantId }) => {
  const response = await CartApiInstance.post(
    `/add/${productId}/${variantId}`
  )
  return response.data;
}