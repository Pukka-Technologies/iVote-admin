import React, { useEffect } from 'react'
import { useStateValue } from '../../../context/StateProvider'
import Axios from '../../../utils/axios'

const Leaderboard = () => {

    const [{user}, dispatch] = useStateValue()

    const fetchLeaderboard = async (params) => {
        const { data } = await Axios({
            method: "POST",
            url: "leaderboard",
            data: {
                event_id: "631344e6c41db786578f8be4"
            }
        })

        console.log("leaderboard",data);
    }

    const fetchVotes = async () => {
        const { data } = await Axios({
            method: "GET",
            url: "vote",
            headers:{
                Authorization: `Bearer ${user.access_token}`
            }
        })

        console.log("votes",data);
    }

    useEffect(() => {
        fetchVotes()
        fetchLeaderboard()
    }, [])
    

  return (
    <div>
        
    </div>
  )
}

export default Leaderboard