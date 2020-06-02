import React from 'react';
import User from './User';
import ElementList from '../common/ElementList';
import ErrorAlert from '../errors/ErrorAlert';
import TextInput from '../input/TextInput';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import UserUtils from './UserUtils';
import { USER_API_PATH } from '../../config';

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

        const loadState = await UserUtils.loadUsers();
        Object.assign(loadState, { isLoadingUsers: false });

        this.setState(loadState);
    }

    async componentDidMount() {
        this.loadUsers();
    }

    render() {
        let userList = <ElementList as={ User } 
                            elements={ this.state.users }
                            isLoading={ this.state.isLoadingUsers }
                            emptyElementsMessage={ "No users to display at the moment" }
                            keyExtractor={ user => user.id } />

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
                <div className="mb-3">
                    <TextInput onAdd={ this.addUser }
                                buttonText="Add User"
                                isLoading={ this.state.isAddingUser }
                                placeholder="Username" />
                </div>
                { newUserErrors }
                { userList }
            </div>
        )
    }
}
