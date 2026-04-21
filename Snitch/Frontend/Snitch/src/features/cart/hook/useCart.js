import { useDispatch } from "react-redux"
import { useState } from "react"
import { addItem } from "../service/cart.api"
import { addItem as addItemToCart } from "../state/cart.slice"

export const useCart = () => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleAddItem({ productId, variantId, quantity = 1 }) {
        if (!productId || !variantId) {
            setError("Product or variant missing")
            return
        }

     try {
    setLoading(true)

    const res = await addItemToCart(payload)

    console.log("API RESPONSE:", res)

    if (!res || !res.success) {
        throw new Error(res?.message || "Add to cart failed")
    }

    return res

} catch (err) {
    console.error("ADD TO CART ERROR:", err)

    setError(err?.response?.data?.message || err.message || "Failed to add item")
} finally {
    setLoading(false)
}
    }

    return { handleAddItem, loading, error }
}