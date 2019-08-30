import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Polls extends Component {
  constructor(){
    super();
    this.state = {
      polls: []      
    }
  }

  getData = async () => {
    const response = await axios.get(`http://localhost:3000/polls`);
    this.setState((state, props) => ({
        polls: response.data
    }));
  }

  componentDidMount(){
    this.getData();
  }

  getQuestion(obj)
  {
    const q = JSON.parse(obj);
    return q.question.value;
  }

  render() {
    return (
      <form class=" border border-light p-5">
          {(this.state.polls || []).map(item => (
            <div className="form-row mb-4" key={item.Id}><Link className="btn btn-success btn-xs" to={`/polls/${item.Id}`}>GO</Link><div class="col" key={item.Id}>{this.getQuestion(item.Poll)}</div></div>
          ))}
      </form>
    )
  }
}
