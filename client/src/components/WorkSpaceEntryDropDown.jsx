import React, { Component } from 'react';
import { Button, DropdownItem } from 'reactstrap';
import { getWorkSpaceMessagesFromServer } from '../socketHelpers/index.js';
import PropTypes from 'prop-types';

export default class WorkSpaceEntryDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { joined: false };
  }

  handleClick(event) {
    let { handleFail, changeCurrentWorkSpace, workSpace } = this.props;
    handleFail();
    getWorkSpaceMessagesFromServer(workSpace.id);
    changeCurrentWorkSpace(workSpace.id, workSpace.name);
  }


  render() {
    let { workSpace, currentWorkSpaceId } = this.props;
    return (
      <DropdownItem className="workSpace-entry-dropdown">
        {workSpace.id === currentWorkSpaceId ? (
          <h5
            className="workSpace-name highlight-workSpace"
            onClick={event => this.handleClick(event)}
          >
            {' '}
            # {workSpace.name}
          </h5>
        ) : (
          <h5 className="workSpace-name workSpace-hover" onClick={event => this.handleClick(event)}>
            {' '}
            # {workSpace.name}
          </h5>
        )}
      </DropdownItem>
    );
  }
}

WorkSpaceEntryDropdown.propTypes = {
  currentWorkSpaceId: PropTypes.number,
}
