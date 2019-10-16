const initialState = {
  eventList: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const eventList = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENT_LIST_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_EVENT_LIST_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_EVENT_LIST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        eventList: action.payload.data.response,
      };
    default:
      return state;
  }
};

export default eventList;
