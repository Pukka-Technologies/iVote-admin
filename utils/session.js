import Axios from "./axios"

export const GET_SESSION_USER = async (route, callback) => {


    try {   
        const { data } = await Axios({
            method: "GET",
            url: route,
        })

        callback(data)
        if (data.success) {
            console.log("session started")
            return data.admin
        }else{
            return null
        }

    } catch (e) {
        // console.log(e)
        return null
    }
}