export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_EVENT_CATEGORIES: 'SET_EVENT_CATEGORIES',

}

const reducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_EVENT_CATEGORIES:
            return {
                ...state,
                event_categories: action.event_categories,
            };
        default:
            return state;
    }
}

export default reducer;