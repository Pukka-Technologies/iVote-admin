export const actionTypes = {
    SET_USER: 'SET_USER',
    SET_EVENTS: 'SET_EVENTS',

}

const reducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_EVENTS:
            return {
                ...state,
                events: action.events,
            };
        default:
            return state;
    }
}

export default reducer;