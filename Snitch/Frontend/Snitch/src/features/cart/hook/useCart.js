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

    try {
      setLoading(true);

      const res = await addItem(payload);
      console.log("API RESPONSE:", res);

      if (!res || !res.success) {
        throw new Error(res?.message || "Add to cart failed");
      }

     dispatch(addTheItem({
    productId,
    variantId,
    quantity,
    price: item?.price || 0, 
    }));

      return res;
    } catch (err) {
      console.error("ADD TO CART ERROR:", err);

      setError(
        err?.response?.data?.message || err.message || "Failed to add item",
      );
    } finally {
      setLoading(false);
    }
  }

  return { handleAddItem, loading, error };
};
