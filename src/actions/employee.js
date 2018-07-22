import axios from "axios";
import * as types from "./types";
import {
    axiosConfig,
    getUserDetails
} from "config/api";

export function resetEmployee() {
    return dispatch => {
        dispatch({
            type: types.RESET_EMPLOYEE_DETAILS
        });
    };
}

export function fetchEmployeeDetails(id) {
    const url = getUserDetails(id);
    return function (dispatch) {
        dispatch({
            type: types.GETTING_EMPLOYEE_DETAILS,
            value: true
        });
        axios
            .get(url, {}, axiosConfig())
            .then(response => {
                dispatch({
                    type: types.GET_EMPLOYEE_DETAILS_SUCCEDED,
                    value: {
                        id: response.data.data.id,
                        name: [response.data.data.first_name, response.data.data.last_name].join(' '),
                        src: response.data.data.avatar
                    }
                });
            })
            .catch(error => {

            });
    };
}