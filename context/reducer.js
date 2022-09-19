export const actionTypes = {
  SET_USER: "SET_USER",
  SET_EVENTS: "SET_EVENTS",
  ADD_EVENT: "ADD_EVENT",
  ADD_CONTESTANT: "ADD_CONTESTANT",
  SET_CONTESTANTS: "SET_CONTESTANTS",
  SET_ADMINS: "SET_ADMINS",
  ADD_ADMIN: "ADD_ADMIN",
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
  UPDATE_CONTESTANT: "UPDATE_CONTESTANT",
  DELETE_CONTESTANT: "DELETE_CONTESTANT",
  SET_VOTES: "SET_VOTES",
  ADD_VOTE: "ADD_VOTE",
};

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
    case actionTypes.ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.event],
      };
    case actionTypes.ADD_CONTESTANT:
      return {
        ...state,
        contestants: [...state.contestants, action.contestant],
      };
    case actionTypes.SET_CONTESTANTS:
      return {
        ...state,
        contestants: action.contestants,
      };
    case actionTypes.SET_ADMINS:
      return {
        ...state,
        admins: action.admins,
      };
    case actionTypes.ADD_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.admin],
      };
    case actionTypes.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.event._id ? action.event : event
        ),
      };
    case actionTypes.UPDATE_CONTESTANT:
      return {
        ...state,
        contestants: state.contestants.map((contestant) =>
          contestant._id === action.contestant._id
            ? action.contestant
            : contestant
        ),
      };
    case actionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action._id),
      };
    case actionTypes.DELETE_CONTESTANT:
      return {
        ...state,
        contestants: state.contestants.filter(
          (contestant) => contestant._id !== action._id
        ),
      };
    case actionTypes.SET_VOTES:
      return {
        ...state,
        votes: action.votes,
      };
    case actionTypes.ADD_VOTE:
      return {
        ...state,
        votes: [...state.votes, action.vote],
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
