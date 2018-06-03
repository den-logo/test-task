import React from 'react';
import { connect } from 'react-redux';
import { Panel, Badge, Button, Glyphicon } from 'react-bootstrap';

class Film extends React.Component {
  handleClick() {
    this.props.onDelete(this.props.id);
  }
  render() {
    return (
      <Panel style={{ height: '100%', position: 'relative' }}>
        <Panel.Heading >
          <Button bsSize="xsmall" bsStyle="danger" className="pull-right" onClick={() => this.handleClick()}>
            <span style={{ verticalAlign: 'middle', display: 'block' }}><Glyphicon glyph="remove" /></span>
          </Button>
          <div style={{ paddingRight: 30 }}>
            <b className="text-left" style={{ wordBreak: 'break-all' }}>
              {this.props.title}
            </b>
          </div>
        </Panel.Heading>
        <Panel.Body style={{ wordBreak: 'break-all' }}>Stars: {this.props.stars}</Panel.Body>
        <Panel.Body style={{ textAlign: 'middle' }}>
          <span className="text-muted" style={{ position: 'absolute', bottom: 15, left: 15 }}>{this.props.release} y.</span>
          <Badge 
            className="pull-right" 
            style={{ position: 'absolute', bottom: 15, left: 70 }}>
            {this.props.radio}
          </Badge>
          <div className="pull-right text-muted"
          style={{ position: 'absolute', bottom: 15, right: 15 }}>
            #{this.props.id}
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default connect(
  state => ({
    films: state.films
  }),
  dispatch => ({
    onDelete: (id) => {
      dispatch({type: 'DELETE_FILM', payload: id });
    }
  })
)(Film);