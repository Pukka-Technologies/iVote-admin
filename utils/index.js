import { toast } from "react-toastify"
import Axios from "./axios"

export const LOGOUT = async (dispatch) => {
    try {
        const {data} = await Axios({
            url:"logout",
            method:"GET"
        })
        if(data.success)
        {
            dispatch({
                type:"SET_USER",
                user:null
            })
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}