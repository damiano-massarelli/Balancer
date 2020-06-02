import React, { useState } from 'react';
import TextInput from '../input/TextInput';
import MultiElementSelect from '../input/MultiElementSelect';
import ErrorAlert from '../errors/ErrorAlert';
import Collapsible from '../common/Collapsible';

function UserSelectElement(props) {
    return <span>{ props.element.name }</span>
}

export default function GroupInput(props) {

    const [selectedUsers, setSelectedUsers] = useState([]);

    const onAdd = (groupName) => {
        props.onAdd(groupName, selectedUsers);
    }

    let userSelect = <MultiElementSelect elements={ props.users }
                        as={ UserSelectElement }
                        keyExtractor={ element => element.id }
                        onChange={ selected => setSelectedUsers(selected) }
                        isLoading = { props.isLoadingUsers } />

    if (props.errorLoadingUsers) {
        userSelect = <ErrorAlert title="Cannot load users"
                                text="The service is temporarily not available"
                                onRetry= { props.reloadUsers } />
    }

    return (
        <>
            <TextInput onAdd={ onAdd }
                        buttonText="Add Group"
                        isLoading={ props.isAddingGroup }
                        placeholder="Group name" />
            
            <Collapsible title="Members">
                { userSelect }
            </Collapsible>
        </>
    );
}