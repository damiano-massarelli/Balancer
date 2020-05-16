import React from 'react';
import User from './User';
import Spinner from 'react-bootstrap/Spinner';

export default class UserList extends React.Component {

    render() {
        let elementToDisplay = this.props.users.map(userData => <User key={ userData.id } user={ userData } />);

        if (this.props.isLoading) { // loading, show spinner
            elementToDisplay = (
                <div className="text-center">
                    <Spinner animation="grow" />
                </div>
            );
        }
        else if (this.props.users.length === 0) { // no users to display
            elementToDisplay = (
                <div className="text-center">
                    <i>No users to display at the moment</i>
                </div>
            )
        }

        return elementToDisplay;
    }
}
