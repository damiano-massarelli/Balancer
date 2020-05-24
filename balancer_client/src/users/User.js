import React from 'react';
import Card from 'react-bootstrap/Card'

/**
 * Displays basic information on a single user.
 */
export default class User extends React.Component {
  render() {
    return (
      <Card className="mb-3">
        <Card.Body>
          <Card.Title><i className="fa fa-user"></i> { this.props.data.name }</Card.Title>

        </Card.Body>
      </Card>
    )
  }
}