import React from 'react';
import { USER_API_PATH } from '../config';
import UserList from './UserList';
import ErrorAlert from '../errors/ErrorAlert';
import Spinner from 'react-bootstrap/Spinner';

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoading: true,
            error: false
        };

        this.loadUsers = this.loadUsers.bind(this);
    }

    async loadUsers() {
        this.setState({ error: false, isLoading: true });

        let response = null;
        try {
            response = await fetch(USER_API_PATH);
        }
        catch (e) {
            this.setState({ isLoading: false, error: true });
            return;
        }

        if (response.ok) { 
            const data = await response.json();

            const state = {
                users: data._embedded ? data._embedded.userList : [], 
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
        let userList = <UserList users={ this.state.users } />

        if (this.state.isLoading) {
            userList = (
                <div className="text-center">
                    <Spinner animation="grow" />
                </div>
            );
        }
        else if (this.state.error) {
            userList = <ErrorAlert title="Cannot load users"
                                   text="The service is temporarily not available"
                                   onRetry= { this.loadUsers } />
        }
        else if (this.state.users.length == 0) {
            userList = (
                <div className="text-center">
                    <i>No users to display at the moment</i>
                </div>
            )
        }

        return (
            <div className="mt-5">
                { userList }
            </div>
        )
    }

}