import { STATUS_COLOR, STATUS_TEXT } from "@/utils/enums";
import * as Action from '../actions/application.action';

const initialState = {
  checklist: [],
  links: [
    '/forms/interview-schedule',
    '/forms/selection',
    '/forms/financial-service',
    '/forms/clientele-plans',
    '/forms/clientele-legal'
  ]
};

const application = (state = initialState, action: any) => {
  switch(action.type) {
    case Action.GET_STATUS: {
      return {
        ...state,
        checklist: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default application;