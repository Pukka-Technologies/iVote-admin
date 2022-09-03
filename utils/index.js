import Axios from "./axios"
import { toast } from "react-toastify"

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

export const fetchData = async (route, callback) => {
    try {
        const { data } = await Axios({
            method: "GET",
            url: route,
        })

        callback(data)

    } catch (error) {
        console.log(error)
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
export const addEvent = async (event, token) => {
    try{
        const { data } = await Axios({
            method: "POST",
            url: "event",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: event
        })
    
        console.log(data)
        return data
    }catch(error){
        console.log(error)
        return null
        // toast.error(error.response.data.message)
    }

}

export const fetchContestants = async (callback) => {
    try {
        const { data } = await Axios({
            method: "GET",
            url: "contestant",
        })

        if(data.success){
            // console.log(data.data)
            callback(data.data)
            // return data.data
        }else{
            return null
        }

    } catch (error) {
        console.log(error)
        return null
    }

}