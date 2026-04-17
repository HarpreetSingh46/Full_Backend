import { createProduct, getSellerProduct } from "../services/product.api.js"
import { useDispatch } from "react-redux"
import { setSellerProduct } from "../state/product.slice.js"


export const useProduct = () => {

    const dispatch = useDispatch()
    async function handleCreateProduct(formdata) {
        const data = await createProduct(formdata)
        return data.product;
    }
    async function handleGetSellerProduct() {
        const data = await getSellerProduct()
        dispatch(setSellerProduct(data.products))
        return data.products
    }
    return {
        handleCreateProduct,
        handleGetSellerProduct
    }
}