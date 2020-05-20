import React from 'react';
import TextInput from '../common/TextInput';
import MultiElementSelect from '../common/MultiElementSelect';
import UserUtils from '../users/UserUtils';
import ErrorAlert from '../errors/ErrorAlert';
import Collapsible from '../common/Collapsible';
import { GROUPS_API_PATH } from '../config';

function UserSelectElement(props) {
    return <span>{ props.element.name }</span>
}

export default class GroupInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            selectedUsers: [],
            isLoadingUsers: false,
            errorLoadingUsers: false,
            isAddingGroup: false,
            errorAddingGroup: null
        };

        this.loadUsers = this.loadUsers.bind(this);
        this.addGroup = this.addGroup.bind(this);
    }

    async addGroup(groupName) {
        const groupDTO = {
            name: groupName,
            userIds: this.state.selectedUsers.map(user => user.id)
        };

        console.log(groupDTO);

        let response = null;
        try {
            response = await fetch(GROUPS_API_PATH, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupDTO)
            });
        }
        catch (e) {
            console.log(e);
            //this.setState({ isAddingUser: false, addingUserError: { generic: "The service is temporarily unavailable" } });
            return;
        }

        const data = await response.json();
        console.log(data);

        if (response.ok) { // response is ok, data contains a user
            //users.push(data); // add the new user
            //this.setState( {users: users, isAddingUser: false} );
        }
        else if (response.status === 400) { // bad request, error details are stored in the response data
            //this.setState( {isAddingUser: false, addingUserError: data} );
        }
    }

    async loadUsers() {
        this.setState({ isLoadingUsers: true, errorLoadingUsers: false });

        const loadState = await UserUtils.loadUsers();
        Object.assign(loadState, { isLoadingUsers: false });

        this.setState(loadState);
    }

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        let userSelect = <MultiElementSelect elements={ this.state.users }
                            as={ UserSelectElement }
                            keyExtractor={ element => element.id }
                            onChange={ selected => this.setState( {selectedUsers: selected} ) }
                            isLoading = { this.state.isLoadingUsers } />

        if (this.state.errorLoadingUsers) {
            userSelect = <ErrorAlert title="Cannot load users"
                                    text="The service is temporarily not available"
                                    onRetry= { this.loadUsers } />
        }

        return (
            <div className="mt-5">
                <TextInput onAdd={ this.addGroup }
                            buttonText="Add Group"
                            isLoading={ this.state.isAddingUser }
                            placeholder="Group name" />
                
                <Collapsible title="Members">
                    { userSelect }
                </Collapsible>
            </div>
        );
    }
}