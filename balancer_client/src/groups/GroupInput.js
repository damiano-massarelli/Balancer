import React from 'react';
import Card from 'react-bootstrap/Card';
import TextInput from '../common/TextInput';
import MultiElementSelect from '../common/MultiElementSelect';
import UserUtils from '../users/UserUtils';
import ErrorAlert from '../errors/ErrorAlert';
import Collapsible from '../common/Collapsible';

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
                <TextInput onAdd={ this.addUser }
                            isLoading={ this.state.isAddingUser }
                            placeholder="Group name" />
                
                <Collapsible title="Members">
                    { userSelect }
                </Collapsible>
            </div>
        );
    }
}