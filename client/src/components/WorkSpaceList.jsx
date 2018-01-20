import React, { Component } from 'react';
import { Alert, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import WorkSpaceEntry from './WorkSpaceEntry.jsx';
import CreateWorkSpace from './CreateWorkSpace.jsx';

// Container for all workspaces
export default class WorkSpaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workSpaceQuery: '',
      // createFail usually happens if a workspace already exists
      createFail: false,
    };
    this.handleFail = this.handleFail.bind(this);
    this.getWorkSpaceQuery = this.getWorkSpaceQuery.bind(this);
    this.createWorkSpace = this.createWorkSpace.bind(this);
  }

  // grabs the value from the input field
  getWorkSpaceQuery(query) {
    this.setState({ workSpaceQuery: query });
  }

  // posts the query to the server that results in a success or failed creation
  createWorkSpace() {
    const { updateWorkSpaces } = this.props;
    console.log('updateWorkSpaces: ', updateWorkSpaces);
    let { workSpaceQuery, createFail } = this.state;
    this.setState({ createFail: false });
    if (workSpaceQuery.length > 0) {
      fetch('/workspaces', {
        method: 'POST',
        body: JSON.stringify({ name: workSpaceQuery }),
        headers: { 'content-type': 'application/json' },
      })
        // If post was successful, parse response and re-render workspace list
        .then(resp => (resp.status === 201 ? resp.json() : this.setState({ createFail: true })))
        .then((data) => { updateWorkSpaces(data); })
        .catch(console.error);
    }
  }
  // helper for createWorkSpace
  handleFail() {
    this.setState({ createFail: false });
  }
  // renders everything to do with workspaces, including creation
  render() {
    let { changeCurrentWorkSpace, currentWorkSpaceId, workSpaces, currentUser } = this.props;
    let { createFail, createStatus, workSpaceQuery } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <h3 className="workSpace-header"> Workspaces </h3>{' '}
          </Col>
          <Col className="mt-2">
            <CreateWorkSpace
              getWorkSpaceQuery={this.getWorkSpaceQuery}
              createWorkSpace={this.createWorkSpace}
            />
          </Col>
        </Row>
        {workSpaces.map(workSpace => (
          <WorkSpaceEntry
            workSpace={workSpace}
            handleFail={() => this.handleFail}
            key={workSpace.id}
            changeCurrentWorkSpace={changeCurrentWorkSpace}
            currentWorkSpaceId={currentWorkSpaceId}
            currentUser={currentUser}

          />
        ))}
        <br />
        <br />
        {createFail ? <Alert color="danger"> Failed to create workspace </Alert> : undefined}
      </div>
    );
  }
}
// required prop types
WorkSpaceList.propTypes = {
  workSpaces: PropTypes.array,
  currentWorkSpaceId: PropTypes.number,
}
