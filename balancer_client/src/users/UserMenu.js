import React from 'react';
import { USER_API_PATH } from '../config';
import UserList from './UserList';
import ErrorAlert from '../errors/ErrorAlert';
import Spinner from 'react-bootstrap/Spinner';
import NewUserInput from './NewUserInput';

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoadingUsers: false,
            isAddingUser: false,
            loadingUsersError: false,
            addingUserError: false
        };

        this.loadUsers = this.loadUsers.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    /**
     * Adds a new user to the list.
     * @param {string} username the username of the new user
     */
    async addUser(username) {
        this.setState({ isAddingUser: true, addingUserError: null });

        let response = null;
        try {
            response = await fetch(USER_API_PATH, {
                method: 'POST',
                mode: 'cors',
                headers: {
                'Content-Type': 'text/plain'
                },
                body: username
            });
        }
        catch (e) {
            this.setState({ isAddingUser: false, addingUserError: "Unable to add user" });
            return;
        }

        if (response.ok) {
            const user = await response.json();

            const users = this.state.users.slice();
            users.push(user); // add the new user
            this.setState( {users: users, isAddingUser: false} );
        }
    }

    /**
     * Loads users from server and updates the list
     */
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

        if (this.state.isLoadingUsers) { // loading, show spinner
            userList = (
                <div className="text-center">
                    <Spinner animation="grow" />
                </div>
            );
        }
        else if (this.state.loadingUsersError) { // an error occurred, show error
            userList = <ErrorAlert title="Cannot load users"
                                   text="The service is temporarily not available"
                                   onRetry= { this.loadUsers } />
        }
        else if (this.state.users.length === 0) { // everything went fine but no users to display
            userList = (
                <div className="text-center">
                    <i>No users to display at the moment</i>
                </div>
            )
        }

        return (
            <div className="mt-5">
                <NewUserInput onAdd={ this.addUser } isLoading={ this.state.isAddingUser } />
                { userList }
            </div>
        )
    }
}
