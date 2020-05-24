import React from 'react';
import TextInput from '../common/TextInput';
import MultiElementSelect from '../common/MultiElementSelect';
import ErrorAlert from '../errors/ErrorAlert';
import Collapsible from '../common/Collapsible';

function UserSelectElement(props) {
    return <span>{ props.element.name }</span>
}

export default class GroupInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedUsers: [],
        };

        this.onAdd = this.onAdd.bind(this);
    }

    onAdd(groupName) {
        this.props.onAdd(groupName, this.state.selectedUsers);
    }

    render() {
        let userSelect = <MultiElementSelect elements={ this.props.users }
                            as={ UserSelectElement }
                            keyExtractor={ element => element.id }
                            onChange={ selected => this.setState( {selectedUsers: selected} ) }
                            isLoading = { this.props.isLoadingUsers } />

        if (this.props.errorLoadingUsers) {
            userSelect = <ErrorAlert title="Cannot load users"
                                    text="The service is temporarily not available"
                                    onRetry= { this.props.reloadUsers } />
        }

        return (
            <>
                <TextInput onAdd={ this.onAdd }
                            buttonText="Add Group"
                            isLoading={ this.props.isAddingGroup }
                            placeholder="Group name" />
                
                <Collapsible title="Members">
                    { userSelect }
                </Collapsible>
            </>
        );
    }
}