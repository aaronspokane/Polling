import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

class Input extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: props.val
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.val !== this.props.val)
    {
      this.setState((state) => ({ inputVal: this.props.val }));
    }
  }

  handleChange(event) {
      this.setState({ inputVal: event.target.value });
  }

  handleBlur(event) {
      this.props.handleBlur(this.props.index, event.target.value, this.props.cntrltype);
  }

  handleDelete(event) {
    const index =  event.target.getAttribute('index');
    this.props.handledelete(index);
  }

  render() {
    const { text, handleBlur, handledelete, cntrltype, placeholder, index, ...args } = this.props;
    const { inputVal } = this.state;
    return (
      <div className="form-row mb-4">
        <label>{text}</label>
        <div class="col">
        <input
          label="Id"
          type="text"
          className="form-control"
          id={index}
          value={inputVal}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={placeholder}
          {...args}
           />
           </div>
          {
            cntrltype === 'choice' ?   <Tooltip title="Delete" placement="right"><button type="button" className="btn btn-danger btn-sm mr-1"><Icon className="align-middle" index={index} onClick={this.handleDelete}>delete</Icon></button></Tooltip> : ''
          }
       </div>
    )
  }
}

Input.propTypes = {
  //onBlur: PropTypes.func.isRequired
};

export default Input;
