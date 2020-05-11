import React from 'react';
import { USER_API_PATH } from '../config';
import User from './User';
import Spinner from 'react-bootstrap/Spinner';

export default class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoading: true,
            error: false
        };
    }

    async loadUsers() {
        const response = await fetch(USER_API_PATH);

        if (response.ok) { 
            const data = await response.json();
            const state = {
                users: data,
                isLoading: false,
                error: false
            };
            this.setState(state);
        }
        else {
            this.setState( { isLoading: false, error: true } );
        }
    }

    async componentDidMount() {
        this.loadUsers();
    }

    render() {

        if (this.state.isLoading) { // display loading spinner
            return (
                <div className="text-center">
                    <Spinner className="text-center" animation="grow" />
                </div>
            );
        }
        else if (this.state.error) { // display error message

        }
        else { // display list of users
            const userElements = this.state.users.map(userData => <User key={ userData.id } user={ userData } />);
            return userElements;
        }
    }
}
