import * as Actions from '../actions/user.action';

const initialState = {
  currentUser: null
}

const user = (state = initialState, action: any) => {
  switch(action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...state,
        currentUser: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default user;