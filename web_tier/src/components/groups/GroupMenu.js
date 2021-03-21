import React, { useContext } from 'react';
import GroupInput from './GroupInput'
import { UserContext } from '../../context/users/UserState';
import { GroupContext } from '../../context/groups/GroupState';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import ElementList from '../common/ElementList';
import Group from './Group';

export default function GroupMenu(props) {
    const userContext = useContext(UserContext);
    const groupContext = useContext(GroupContext);

    let newGroupError = null;
    if (groupContext.addingErrors) {
        const error = groupContext.addingErrors;
        if (error.generic) {
            newGroupError = <ErrorAlert text={error.generic} />;
        }
        else if (error.fieldErrors) {
            newGroupError = <FieldValidationErrors errors={error.fieldErrors} />;
        }
    }

    let groupList = <ElementList as={Group}
        elements={groupContext.groups}
        isLoading={groupContext.isLoading}
        emptyElementsMessage="No groups to display at the moment"
        keyExtractor={group => group.id} />
    if (groupContext.loadingErrors) {
        groupList = <ErrorAlert title="Cannot load groups"
            text="The service is temporarily not available"
            onRetry={groupContext.load} />
    }

    return (
        <div className="mt-5">
            <div className="mb-3">
                <GroupInput onAdd={groupContext.add}
                    isLoadingUsers={userContext.isLoading}
                    users={userContext.users}
                    isAddingGroup={groupContext.isAdding}
                    errorLoadingUsers={userContext.loadingErrors}
                    reloadUsers={userContext.load} />
            </div>
            {newGroupError}
            {groupList}
        </div>
    );
}