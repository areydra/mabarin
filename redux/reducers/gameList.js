const initialState = {
  gameList: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const gameList = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GAME_LIST_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_GAME_LIST_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_GAME_LIST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        gameList: action.payload.data.response,
      };
    default:
      return state;
  }
};

export default gameList;
