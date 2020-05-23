import React from 'react';
import GroupInput from './GroupInput'
import UserUtils from '../users/UserUtils';
import GroupUtils from './GroupUtils';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';

export default class GroupMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            groups: [],
            isLoadingUsers: false,
            errorLoadingUsers: false,
            isAddingGroup: false,
            errorAddingGroup: null
        };

        this.loadUsers = this.loadUsers.bind(this);
        this.addGroup = this.addGroup.bind(this);
    }   

    /**
     * Creates a new group and adds it to the list
     * of groups.
     */
    async addGroup(groupName, selectedUsers) {
        this.setState({ isAddingGroup: true, errorAddingGroup: null });

        const groupDTO = {
            name: groupName,
            userIds: selectedUsers.map(user => user.id)
        };

        const result = await GroupUtils.postGroup(groupDTO);

        const state = { isAddingGroup: false };
        if (result.errorAddingGroup) { // errors found
            Object.assign(state, { errorAddingGroup: result.errorAddingGroup });
        }
        else { // everything ok
            const groups = this.state.groups.splice();
            groups.push(result.group);
            console.log(groups);
            Object.assign(state, { groups });
        }

        this.setState( state );
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

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        let newGroupError = null;

        if (this.state.errorAddingGroup) {
            const error = this.state.errorAddingGroup;
            if (error.generic) {
                newGroupError = <ErrorAlert text={ error.generic } />;
            }
            else if (error.fieldErrors) {
                newGroupError = <FieldValidationErrors errors={ error.fieldErrors } />;
            }
        }

        return (
            <>
                <GroupInput onAdd={ this.addGroup }
                        isLoadingUsers={ this.state.isLoadingUsers }
                        users={ this.state.users }
                        isAddingGroup={ this.state.isAddingGroup }
                        errorLoadingUsers={ this.state.errorLoadingUsers }
                        reloadUsers={ this.loadUsers } />
                { newGroupError }
            </>
        );
    }

}