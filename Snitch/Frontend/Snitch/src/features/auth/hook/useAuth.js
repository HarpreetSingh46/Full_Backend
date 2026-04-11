import { setError, setLoading, setUser } from "../state/auth.slice";

import { register , login } from "../services/auth.api";
import { useDispatch } from "react-redux";



export const userAuth = () => {

    const dispatch = useDispatch();

    async function handleRegister({ email, isSeller = false, contact, username, password }) {
        const data = await register({ email, contact, username, password, isSeller })
        dispatch(setUser(data.user))
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })
        dispatch(setUser(data.user))
    }


    return { handleRegister , handleLogin }


}