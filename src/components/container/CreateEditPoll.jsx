import React, { Component } from "react";
import Input from "./Input.jsx";
import { ToastContainer, toast } from 'react-toastify';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import uuid from "uuid";

class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      question: {value: ''},
      choices: [{index: 0, value: ''}, {index: 1, value: ''}, {index: 2, value: ''}],
      update: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSave = this.handleSave.bind(this);

    if(this.props.match.params.id !== undefined)
    {
        this.getData();
    }
  }

  getData = async () => {
    const response = await axios.get(`http://localhost:3000/polls/${this.props.match.params.id}`);
    const poll = JSON.parse(response.data.Poll);
    const Id = response.data.Id;
    console.log(poll.question.value)
    this.setState((state, props) => ({
       id: Id,
       question: poll.question,
       choices: poll.choices,
       update: true
    }));
  }

  handleBlur(index, val, type) {
    if(type === 'question')
    {
      this.setState((state, props) => ({
        question: {value: val}
      }));
    } else {
      let array = [...this.state.choices];
      var item = array.filter(x => x.index === parseInt(index));
      item[0].value = val;
      this.setState((state,props) => ({
        choices: array
      }));
    }
  }

  handleAdd(event) {
    event.preventDefault();
    const max = Math.max(...this.state.choices.map(o => o.index), 0);
    this.setState((state, props) => ({
      choices: [...this.state.choices, {index: max+1, value: ''}]
    }));
  }

  handleDelete(index) {
    let array = [...this.state.choices];
    this.setState((state, props) => ({
      choices: array.filter(x => x.index !== parseInt(index))
    }));
  }

  handleClear(event) {
    event.preventDefault();
    this.clear();
  }

  clear = () => {
    let array = [...this.state.choices];
    this.setState((state, props) => ({
      question: {value: ""},
      choices: [{index: 0, value: ""}, {index: 1, value: ""}, {index: 2, value: ""}]
    }));
  }

  handleSave = async event => {
    event.preventDefault();
    const obj = {Id: uuid.v4(), data: this.state};

    var headers = {
       'Content-Type': 'application/json'
    }

    const response = await axios.post(`http://localhost:3000/createEdit`, JSON.stringify(obj), {"headers" : headers});

    if(response.data.success) {
      toast.success(response.data.msg);
      setTimeout(() => {
        this.clear();
      }, 1500);
    }
    else
      toast.error(response.data.msg);
  }

  render() {
    var { question } = this.state;
    return (
      <form class="text-center border border-light p-5">
        <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick
            hideProgressBar={true}
        />

        <Tooltip title="Add">
          <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={this.handleAdd}>add</Icon></button>
        </Tooltip>
        <Tooltip title="Save">
          <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={this.handleSave}>save</Icon></button>
        </Tooltip>
        <Tooltip title="Clear">
          <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={this.handleClear}>undo</Icon></button>
        </Tooltip>

        <Input
            text="Question"
            val={question.value}
            handleBlur={this.handleBlur}
            cntrltype='question'
            placeholder="Question Text"
            style={{width: '550px'}}
          />
          {
              this.state.choices.map(choice => <Input key={choice.index}
                  text="Choice"
                  val={choice.value}
                  handleBlur={this.handleBlur}
                  handledelete={this.handleDelete}
                  cntrltype='choice'
                  placeholder="Choice Text"
                  index={choice.index} />
               )
          }
      </form>
    );
  }
}
export default CreatePoll;
