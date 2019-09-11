import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Poll from './Poll.jsx';
import Icon from '@material-ui/core/Icon';

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
            <div className="form-row mb-4" key={item.Id}>
              <Link to={`/edit/${item.Id}`}><Icon>edit</Icon></Link>          
              <Link to={`/answers/${item.Id}`}><Icon>history</Icon></Link>
              <Link to={`/polls/${item.Id}`}><Icon>add_circle</Icon></Link>
              <div class="col" key={item.Id}>{this.getQuestion(item.Poll)}</div>
            </div>
          ))}
      </form>
    )
  }
}
