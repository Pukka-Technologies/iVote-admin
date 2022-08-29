import { session_user } from "../utils/session";

const user = session_user() || null

export const initialState = {
    user
}