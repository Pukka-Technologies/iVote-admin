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
export const addAdmin = async (admin, token) => {
    try{
        const { data } = await Axios({
            method: "POST",
            url: "admin",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: admin
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

export const getEventStatus = (opening_date, closing_date) => {
    const today = new Date();
    const start = new Date(opening_date);
    const end = new Date(closing_date);
    let status = "";
    if (today < start) {
      status = "upcoming";
    } else if (today > end) {
      status = "closed";
    } else {
      status = "ongoing";
    }
    return status;
}

export const getEventsByType = (events, type) => {
    if (type === "all") {
        return events;
    }
    return events.filter((event) => getEventStatus(event.opening_date, event.closing_date) === type);
}