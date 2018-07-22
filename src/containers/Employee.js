
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import update from "immutability-helper";
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { fetchEmployeeDetails, resetEmployee } from 'actions/employee';
import { Loader } from 'components/Loader';
import { DetailsView } from 'components/DetailsView';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDepartment: undefined,
      selectedId: undefined,
      id: [],
      departments: []
    };
  }

  componentWillMount = () => {
    let departments = [], i = 1;
    for (let dep in this.props.records) {
      departments.push({ key: i++, text: dep });
    }
    const newState = update(this.state, {
      departments: { $set: departments }

    });
    this.setState(newState);
  }

  changeDepartment = (item) => {
    let id = [], i = 1;
    this.props.records[item.text].forEach(val => {
      id.push({ key: i++, text: val });
    });
    const newState = update(this.state, {
      selectedDepartment: { $set: item },
      id: { $set: id },
      selectedId: { $set: undefined },
    });
    this.setState(newState);
  }

  changeId = (item) => {
    const newState = update(this.state, {
      selectedId: { $set: item }
    });
    this.setState(newState);
  }

  getDetails = () => {
    if (this.state.selectedId) {
      this.props.actions.fetchEmployeeDetails(this.state.selectedId.text);
    } else {
      alert('please make valid selection');
    }
  }

  clear = () => {
    const newState = update(this.state, {
      selectedDepartment: { $set: undefined },
      selectedId: { $set: undefined },
      id: { $set: [] }
    });
    this.setState(newState, () => { this.props.actions.resetEmployee(); });
  }

  render() {
    const { selectedDepartment, selectedId, id, departments } = this.state;
    return (
      <div className='ms-Grid employee-view'>
        <div className='ms-Grid-row'>
          <div className='ms-Grid-col ms-sm12 ms-md6 ms-lg4'>
            <Dropdown
              label='Departments:'
              placeHolder='Select an Option'
              selectedKey={selectedDepartment ? selectedDepartment.key : 0}
              options={departments}
              onChanged={this.changeDepartment}
            />
          </div>
          <div className='ms-Grid-col ms-sm12 ms-md6 ms-lg4'>
            <Dropdown
              label='Employee Id:'
              placeHolder='Select an Option'
              selectedKey={selectedId ? selectedId.key : 0}
              options={id}
              onChanged={this.changeId}
            />
          </div>
          <div className='ms-Grid-col ms-sm12 ms-md6 ms-lg4 button-container'>
            <PrimaryButton text='Get Details' onClick={this.getDetails} />
            <PrimaryButton text='Clear' onClick={this.clear} />
          </div>
        </div>
        <div className='ms-Grid-row'>
          <div className='ms-Grid-col ms-sm12 ms-textAlignCenter details-view'>
            {this.props.fetching && (<Loader />)}
            {!this.props.fetching && (<DetailsView
              id={this.props.current.id}
              name={this.props.current.name}
              src={this.props.current.src}
            />)}
          </div>
        </div>
      </div>
    );
  }

}

Employee.propTypes = {
  actions: PropTypes.object,
  records: PropTypes.object,
  current: PropTypes.object,
  fetching: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    records: state.employee.records,
    current: state.employee.current,
    fetching: state.employee.fetching
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        resetEmployee,
        fetchEmployeeDetails
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
