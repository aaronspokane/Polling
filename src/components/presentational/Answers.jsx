import React, { Component } from "react";
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import axios from 'axios';

export default class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Answers: []
    }
  }

  getData = async (event) => {
    const response = await axios.get(`http://localhost:3000/answers/${this.props.match.params.id}`);
    this.setState((state, props) => ({
        Answers: response.data
    }));
  }

  componentDidMount() {
    this.getData();
  }

  render() { 
    return (
      <div>
      <BootstrapTable data={this.state.Answers} striped hover>
        <TableHeaderColumn isKey dataField='User'>User</TableHeaderColumn>
        <TableHeaderColumn dataField='Answer'>Answer</TableHeaderColumn>
      </BootstrapTable>
      </div>
    )
  }
}
