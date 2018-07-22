import React from "react";
import PropTypes from "prop-types";


export const DetailsView = ({ ...props }) => {
    const shouldView = props.id || props.name || props.src;
    return shouldView ? <div className='ms-Grid-row'>
        <div className='ms-Grid-col ms-sm12 ' >
            <div className='image-wrapper'>
                <img src={props.src} alt={props.name} />
            </div>
        </div>
        <div className='ms-Grid-col ms-sm12'>
            <div className='ms-Grid-row'>
                <div className='ms-textAlignLeft ms-Grid-col ms-sm6'> ID: {props.id} </div>
                <div className='ms-textAlignRight ms-Grid-col ms-sm6'>Name: {props.name} </div>
            </div>
        </div>
                        </div> : null;
};


DetailsView.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    src: PropTypes.string,
};

DetailsView.defaultProps = {
    id: null,
    name: '',
    src: '',
};


