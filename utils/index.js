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

export const fetchEvents = async () => {
    try {
        const { data } = await Axios({
            method: "GET",
            url: "event",
        })

        if(data.success){
            // console.log(data.data)
            return data.data
        }else{
            return null
        }

    } catch (error) {
        console.log(error)
        return null
    }

}

export const addContestant = async (contestant, token) => {
    try{
        const { data } = await Axios({
            method: "POST",
            url: "contestant",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: contestant
        })
    
        console.log(data)
        return data
    }catch(error){
        console.log(error)
        // toast.error(error.response.data.message)
    }

}