import Axios from "./axios"

export const session_user = async () => {

    console.log("inside session");

    try {
        const { data } = Axios({
            method: "GET",
            url: "refresh",
        })

        if (data.success) {
            console.log("session started")
            console.log(data)
            return data.admin
        }else{
            return null
        }
    } catch (e) {
        console.log(e)
        return null
    }
}