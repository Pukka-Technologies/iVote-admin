import Axios from "./axios"

export const GET_SESSION_USER = async () => {


    try {   
        const { data } = await Axios({
            method: "GET",
            url: "refresh",
        })

        if (data.success) {
            console.log("session started")
            return data.admin
        }else{
            return null
        }
    } catch (e) {
        console.log(e)
        return null
    }
}