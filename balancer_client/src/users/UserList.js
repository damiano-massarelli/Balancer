import React from 'react';
import User from './User';

export default class UserList extends React.Component {

    render() {
        const userElements = this.props.users.map(userData => <User key={ userData.id } user={ userData } />);
        return userElements;
    }
}
