import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

export default class Poll extends Component {
  constructor(props){
    super(props);
    this.state = {
      Id: this.props.match.params.id,
      question: {value: ""},
      choices: [],
      selectedIndex: null,
      selectedValue: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave = async event => {
    event.preventDefault();
    const obj = {Id: this.state.id, answer: this.state.selectedValue};

    var headers = {
       'Content-Type': 'application/json'
    }

    const response = await axios.post(`http://localhost:3000/answers/create/${this.props.match.params.id}`, JSON.stringify(obj), {"headers" : headers});
    if(response.data.success) {
        toast.success(<div class="text-center">{response.data.msg}</div>);
        setTimeout(() => {
          this.props.history.push('/');
        }, 1500);
    }
    else
        toast.error(response.data.msg);
  }

  handleChange(event) {
    const ID = event.target.id;
    const Val = event.target.value;
    this.setState((state, props) => ({
       selectedIndex: ID,
       selectedValue: Val
    }));
  }

  getData = async () => {
    const response = await axios.get(`http://localhost:3000/polls/${this.props.match.params.id}`);
    const poll = JSON.parse(response.data.Poll);
    console.log(poll.question.value)
    this.setState((state, props) => ({
       question: poll.question,
       choices: poll.choices
    }));
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    return (
      <form class=" border border-light p-5">
      <ToastContainer
          position="top-center"
          autoClose={5000}
          closeOnClick
          hideProgressBar={true}
      />
       <label>{this.state.question.value}</label>
       { (this.state.choices || []).map((choice, index) => (
          <div class="custom-control custom-radio" key={index}>
            <input type="radio" onChange={this.handleChange} checked={this.state.selectedIndex == choice.index} id={choice.index} name={choice.index} class="custom-control-input" value={choice.value} />
            <label class="custom-control-label" for={choice.index}>{choice.value}</label>
          </div>
        ))
       }
       <br />

      <Tooltip title="Save">
        <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={this.handleSave}>save</Icon></button>
      </Tooltip>
      </form>
    )
  }
}
