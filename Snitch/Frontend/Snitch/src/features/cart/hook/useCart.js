import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItem } from "../service/cart.api.js";
import { addTheItem  } from "../state/cart.slice.js";

export const useCart = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleAddItem({ productId, variantId, quantity = 1 }) {
    if (!productId || !variantId) {
      setError("Product or variant missing");
      return;
    }

    const payload = { productId, variantId, quantity };
    console.log("SENDING ADD TO CART PAYLOAD:", payload);

    try {
      setLoading(true);

      const res = await addItem(payload);
      console.log("API RESPONSE:", res);

      if (!res || !res.success) {
        throw new Error(res?.message || "Add to cart failed");
      }

      // Find the item in the returned cart to get the correct price (it might be populated)
      const addedItem = res.cart?.items.find(item => 
        (item.productId?._id?.toString() === productId || item.productId?.toString() === productId) &&
        (item.variantId?.toString() === variantId)
      );

      dispatch(addTheItem({
        productId,
        variantId,
        quantity,
        price: addedItem?.price?.amount || 0, 
      }));

      return res;
    } catch (err) {
      console.error("ADD TO CART ERROR:", err);
      if (err.response) {
        console.error("ERROR RESPONSE DATA:", err.response.data);
      }

      setError(
        err?.response?.data?.message || 
        err?.response?.data?.errors?.[0]?.msg || 
        err.message || 
        "Failed to add item",
      );
    } finally {
      setLoading(false);
    }
  }

  return { handleAddItem, loading, error };
};
