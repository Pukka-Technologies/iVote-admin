import { fetchEvents } from "../utils"

const events = fetchEvents() || null
export const initialState = {
    user:null,
    events
}