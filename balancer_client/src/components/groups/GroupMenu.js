import React from 'react';
import GroupInput from './GroupInput'
import UserUtils from '../users/UserUtils';
import GroupUtils from './GroupUtils';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import ElementList from '../common/ElementList';
import Group from './Group';

export default class GroupMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            groups: [],
            isLoadingGroups: false,
            isLoadingUsers: false,
            errorLoadingGroups: false,
            errorLoadingUsers: false,
            isAddingGroup: false,
            errorAddingGroup: null
        };

        this.loadUsers = this.loadUsers.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
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
            const groups = [result.group, ...this.state.groups];
            console.log(groups);
            Object.assign(state, { groups });
        }

        this.setState( state );
    }

    async loadGroups() {
        this.setState({ groups: [], isLoadingGroups: true, errorLoadingGroups: false });

        const result = await GroupUtils.getGroups();

        Object.assign(result, {isLoadingGroups: false});
        this.setState(result);
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
        this.loadGroups();
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

        let groupList = <ElementList as={ Group } 
                            elements={ this.state.groups }
                            isLoading={ this.state.isLoadingGroups }
                            emptyElementsMessage={ "No groups to display at the moment" }
                            keyExtractor={ group => group.id } />
        if (this.state.errorLoadingGroups) {
            groupList = <ErrorAlert title="Cannot load groups"
                                    text="The service is temporarily not available"
                                    onRetry= { this.loadGroups } />
        }

        return (
            <div className="mt-5">
                <div className="mb-3">
                    <GroupInput onAdd={ this.addGroup }
                            isLoadingUsers={ this.state.isLoadingUsers }
                            users={ this.state.users }
                            isAddingGroup={ this.state.isAddingGroup }
                            errorLoadingUsers={ this.state.errorLoadingUsers }
                            reloadUsers={ this.loadUsers } />
                </div>
                { newGroupError }
                { groupList }
                
            </div>
        );
    }

}