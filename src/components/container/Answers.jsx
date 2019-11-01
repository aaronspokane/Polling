import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
import * as api from '../../api/';

export default class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Answers: []
    }
  }

  getData = async (event) => {
    const response = await api.get(`/answers/${this.props.match.params.id}`);
    this.setState((state, props) => ({
        Answers: response.data
    }));
  }

  dateFormatter = (cell, row) => {
    return (
        <span>
         <Moment date={cell}  format="MM/DD/YYYY HH:mm" />
        </span>
    );
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const columns = [{
        dataField: 'User',
        text: 'User Id'
      }, {
        dataField: 'Answer',
        text: 'Answer'
      }, {
        dataField: 'Date',
        text: 'Date Answered',
        formatter: this.dateFormatter
      }];

    return (
      <div>
         <BootstrapTable
            keyField='User'
            data={this.state.Answers}
            columns={columns}
            striped
            hover
            condensed
            />
      </div>
    )
  }
}
