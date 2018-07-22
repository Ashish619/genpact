import * as types from "actions/types";
import initialState from "./initialState";
import { mergeDeep } from "helpers/utils";

export default function employee(state = initialState.employee, action) {
  switch (action.type) {
    case types.RESET_EMPLOYEE_DETAILS:
      return Object.assign({}, state, {
        ...initialState.employee
      });
    case types.GET_EMPLOYEE_DETAILS_SUCCEDED:
    console.log(action);
      return mergeDeep({}, state, {
        current: {
          id: action.value.id,
          name: action.value.name,
          src: action.value.src
        },
        fetching: false
      });
    case types.GETTING_EMPLOYEE_DETAILS:
      return mergeDeep({}, state, {
        fetching: action.value
      });
    default:
      return state;
  }
}
