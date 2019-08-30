import React, { Component } from "react";
import Input from "../presentational/Input.jsx";
import axios from 'axios';
import uuid from "uuid";

class CreatePoll extends Component {
  constructor() {
    super();
    this.state = {
      question: {value: ''},
      choices: [{index: 0, value: ''}, {index: 1, value: ''}, {index: 2, value: ''}]
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleBlur(index, val, type) {
    if(type === 'question')
    {
      this.setState((state, props) => ({
        question: {value: val}
      }));
    } else {
      let array = [...this.state.choices];
      var item = this.state.choices.filter(x => x.index === parseInt(index));
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

    const response = await axios.post(`http://localhost:3000/create`, JSON.stringify(obj), {"headers" : headers});
    console.log(response);
  }

  render() {
    var { question } = this.state;
    return (
      <form class="text-center border border-light p-5">

        <button type="button" className="btn btn-primary btn-sm mr-1" onClick={this.handleAdd}>Add New Choice</button>
        <button type="button" className="btn btn-primary btn-sm mr-1" onClick={this.handleSave}>Save</button>
        <button type="button" className="btn btn-primary btn-sm mr-1" onClick={this.handleClear}>Clear</button>
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
              index={choice.index}
              />
            )
          }
      </form>
    );
  }
}
export default CreatePoll;
