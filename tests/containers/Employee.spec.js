import React from "react";
import configureStore from "redux-mock-store";
import { shallow, mount } from "enzyme";
import thunk from "redux-thunk";
import Employee from "../../src/containers/Employee";

jest.mock("actions/employee", () => {
  const RESET_EMPLOYEE_DETAILS = 'RESET_EMPLOYEE_DETAILS';
  const GETTING_EMPLOYEE_DETAILS = 'GETTING_EMPLOYEE_DETAILS';
  const GET_EMPLOYEE_DETAILS_SUCCEDED = 'GET_EMPLOYEE_DETAILS_SUCCEDED';

  const resetEmployee = () => {
    return dispatch => {
      dispatch({
        type: RESET_EMPLOYEE_DETAILS
      });
    };
  }

  const fetchEmployeeDetails = (type) => {
    return dispatch => {

      dispatch({
        type: GETTING_EMPLOYEE_DETAILS,
        value: true
      });

      dispatch({
        type: GET_EMPLOYEE_DETAILS_SUCCEDED,
        value: {
          id: 6,
          name: 'Tracey Ramos',
          src: 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg'
        }
      });
    };
  };
  return {
    fetchEmployeeDetails,
    resetEmployee
  };
});

const middlewares = [thunk];

let initialState = {
  employee: {
    records: {
      hr: [1, 2, 3, 4, 5],
      engineering: [6, 7, 8, 9, 10]
    },
    current: {
      id: null,
      name: "",
      src: ""
    },
    fetching: false
  },
};


const mockStore = configureStore(middlewares);
let store, wrapper;

describe("<Employee />", () => {
  beforeEach(() => {
    global.sessionStorage = jest.genMockFunction();
    global.sessionStorage.setItem = jest.genMockFunction();
    global.sessionStorage.getItem = jest.genMockFunction();
    global.sessionStorage.removeItem = jest.genMockFunction();
  });



  it("render the Employee", () => {
    store = mockStore(initialState);
    wrapper = mount(<Employee store={store} />);
    const employeeView = wrapper.find('.employee-view');
    expect(employeeView).toHaveLength(1);
  });




  it("render the Employee Details correctly with get Details correct parameters and clear on clear call", () => {
    store = mockStore(initialState);
    wrapper = shallow(<Employee store={store} />).dive();
    wrapper.instance().getDetails();
    expect(wrapper.state('selectedId')).toBe(undefined);
    wrapper.instance().changeDepartment({ key: 2, text: 'engineering' });
    wrapper.instance().changeId({ key: 1, text: 6 });
    wrapper.instance().getDetails();
    expect(wrapper.state('selectedId').text).toBe(6);
    wrapper.instance().clear();
    expect(wrapper.state('selectedId')).toBe(undefined);
  });



  it("render the Loader", () => {
    initialState.employee.fetching = true;
    store = mockStore(initialState);
    wrapper = mount(<Employee store={store} />);
    const employeeView = wrapper.find('.ms-ProgressIndicator');
    expect(employeeView).toHaveLength(1);
  });

});

