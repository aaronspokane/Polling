import React, { Component } from "react";
import * as api from '../../api/';
import { ToastContainer, toast } from 'react-toastify';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '../presentational/Toolbar.jsx';

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

    const response = await api.post(`/answers/create/${this.props.match.params.id}`, obj);
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
    const response = await api.get(`/polls/${this.props.match.params.id}`);
    const poll = JSON.parse(response.data.Poll);    
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
      <div class="text-center">
      <Toolbar
        handleSave={this.handleSave}
        AnswerOnly={true}
       />
       </div>
       <br />
       <label>{this.state.question.value}</label>
       { (this.state.choices || []).map((choice, index) => (
          <div class="custom-control custom-radio" key={index}>
            <input type="radio" onChange={this.handleChange} checked={this.state.selectedIndex == choice.index} id={choice.index} name={choice.index} class="custom-control-input" value={choice.value} />
            <label class="custom-control-label" for={choice.index}>{choice.value}</label>
          </div>
        ))
       }
      </form>
    )
  }
}
