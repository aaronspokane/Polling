import React, { Component } from "react";
import Input from "./Input.jsx";
import { ToastContainer, toast } from 'react-toastify';
import * as api from '../../api/';
import Toolbar from '../presentational/Toolbar.jsx';
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
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    if(this.props.match.params.id !== undefined)
    {
        this.getData();
    }
  }

  getData = async () => {
    const response = await api.get(`/polls/${this.props.match.params.id}`);
    const poll = JSON.parse(response.data.Poll);
    const Id = response.data.Id;

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

  handleRemove = async event => {
    event.preventDefault();
    const response = await api.post(`/removePoll`, {id: this.state.id});

    if(response.data.success) {
      toast.success(response.data.msg);
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500);
    }
    else
      toast.error(response.data.msg);
  }

  handleSave = async event => {
    event.preventDefault();
    const choiceAvailable = (this.state.choices || []).filter(x => x.value.length > 0 && x.value !== 'Choice Text');
    if(this.state.question.value.length <= 0 || choiceAvailable.length <= 0)
    {
      toast.error("Question cannot be blank and there must be at least one available choice.");
      return false;
    }

    const obj = {Id: uuid.v4(), data: this.state};

    const response = await api.post(`/createEdit`, obj);

    if(response.data.success) {
      toast.success(response.data.msg);
      setTimeout(() => {
        this.clear();
      }, 1500);
    }
    else
      toast.error(response.data.msg);
  }

  clear = () => {
    this.setState((state, props) => ({
      question: {value: ""},
      choices: [{index: 0, value: ""}, {index: 1, value: ""}, {index: 2, value: ""}]
    }));
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
        <Toolbar
          handleAdd={this.handleAdd}
          handleSave={this.handleSave}
          handleClear={this.handleClear}
          handleRemove={this.handleRemove}
          update={this.state.update}
          AnswerOnly={false}
         />
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
