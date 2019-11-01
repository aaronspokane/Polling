import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const Actionbar = (props) => {
  return (
    <div className="form-row mb-4">
      <Tooltip title="Edit">
        <Link to={`/edit/${props.Poll.Id}`}><Icon>edit</Icon></Link>
      </Tooltip>
      <Tooltip title="Answers">
        <Link to={`/answers/${props.Poll.Id}`}><Icon>history</Icon></Link>
      </Tooltip>
      <Tooltip title="Answer Question">
        <Link to={`/polls/${props.Poll.Id}`}><Icon>add_circle</Icon></Link>
      </Tooltip>
      <div class="col" key={props.Poll.Id}>{JSON.parse(props.Poll.Poll).question.value}</div>
    </div>
  )
}

export default Actionbar;
