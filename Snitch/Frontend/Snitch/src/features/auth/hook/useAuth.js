import { setError, setLoading, setUser } from "../state/auth.slice";

import { register } from "../services/auth.api";
import { useDispatch } from "react-redux";



export const userAuth = () => {

    const dispatch = useDispatch();

    async function handleRegister({ email, isSeller = false, contact, fullname, password }) {
        const data = await register({ email, contact, fullname, password, isSeller })
        dispatch(setUser(data.user))
    }


    return { handleRegister }


}