import { fetchContestants, fetchEvents } from "../utils"

const events = fetchEvents() || null
const contestants = fetchContestants() || null
export const initialState = {
    user:null,
    events,
    contestants
}