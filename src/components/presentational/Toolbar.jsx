import React from 'react'
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const Toolbar = (props) => {
  return(
    <>
      <Tooltip title="Save">
        <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={props.handleSave}>save</Icon></button>
      </Tooltip>
      {
        !props.AnswerOnly ?
         <>
          <Tooltip title="Add">
            <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={props.handleAdd}>add</Icon></button>
          </Tooltip>
          <Tooltip title="Clear">
            <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={props.handleClear}>undo</Icon></button>
          </Tooltip>
         </>
          : null
      }
      {
        props.update ?
          <Tooltip title="Remove Poll">
              <button type="button" className="btn btn-primary btn-sm mr-1"><Icon className="align-middle" onClick={props.handleRemove}>delete</Icon></button>
          </Tooltip>
          : null
      }
    </>
  )
}

export default Toolbar
