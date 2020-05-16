import React from 'react';
import { USER_API_PATH } from '../config';
import UserList from './UserList';
import ErrorAlert from '../errors/ErrorAlert';
import TextInput from './TextInput';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import MultiElementSelect from '../common/MultiElementSelect';

function Te(props) {
    return <span>{ props.element.name }</span>
}

export default class UserMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            isLoadingUsers: false,
            isAddingUser: false,
            errorLoadingUsers: false,
            addingUserError: null
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

        const userDTO = {
            name: username
        };

        let response = null;
        try {
            response = await fetch(USER_API_PATH, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDTO)
            });
        }
        catch (e) {
            this.setState({ isAddingUser: false, addingUserError: { generic: "The service is temporarily unavailable" } });
            return;
        }

        const data = await response.json();
        if (response.ok) { // response is ok, data contains a user
            const users = this.state.users.slice();
            users.push(data); // add the new user
            this.setState( {users: users, isAddingUser: false} );
        }
        else if (response.status === 400) { // bad request, error details are stored in the response data
            this.setState( {isAddingUser: false, addingUserError: data} );
        }
    }

    /**
     * Loads users from server and updates the list
     */
    async loadUsers() {
        this.setState({ errorLoadingUsers: false, isLoadingUsers: true });

        let response = null;
        try {
            response = await fetch(USER_API_PATH);
        }
        catch (e) {
            this.setState({ isLoadingUsers: false, errorLoadingUsers: true });
            return;
        }

        if (response.ok) { 
            const data = await response.json();

            const state = {
                users: data._embedded ? data._embedded.userList : [], 
                isLoadingUsers: false,
                errorLoadingUsers: false
            };
            this.setState(state);
        }
        else {
            this.setState( { isLoadingUsers: false, errorLoadingUsers: true } );
        }
    }

    async componentDidMount() {
        this.loadUsers();
    }

    render() {
        let userList = <UserList users={ this.state.users } isLoading={ this.state.isLoadingUsers } />

        if (this.state.errorLoadingUsers) { // an error occurred, show it
            userList = <ErrorAlert title="Cannot load users"
                                   text="The service is temporarily not available"
                                   onRetry= { this.loadUsers } />
        }

        let newUserErrors = null;
        if (this.state.addingUserError) {
            if (this.state.addingUserError.fieldErrors) {
                newUserErrors = <FieldValidationErrors errors={ this.state.addingUserError.fieldErrors } />;
            }
            else if (this.state.addingUserError.generic) {
                newUserErrors = <ErrorAlert text={ this.state.addingUserError.generic } />
            }
        }

        return (
            <div className="mt-5">
                <TextInput onAdd={ this.addUser } isLoading={ this.state.isAddingUser } />
                { newUserErrors }
                { userList }
                <MultiElementSelect elements={ this.state.users }
                                    as={ Te }
                                    keyExtractor={ elem => elem.id }
                                    onChange={ sel => console.log(sel) } />
            </div>
        )
    }
}
