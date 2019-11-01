import React, { Component } from "react";
import Poll from './Poll.jsx';
import Actionbar from '../presentational/Actionbar.jsx';
import * as api from '../../api/';

export default class Polls extends Component {
  constructor(){
    super();
    this.state = {
      polls: []
    }
  }

  getData = async () => {
    const response = await api.get('/polls');
    this.setState((state, props) => ({
        polls: response.data
    }));
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    return (
      <form class=" border border-light p-5">
          {(this.state.polls || []).map(item => (          
            <Actionbar Poll={item} key={item.Id} />
          ))}
      </form>
    )
  }
}
