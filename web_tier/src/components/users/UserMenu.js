import React, { useContext } from 'react';
import User from './User';
import ElementList from '../common/ElementList';
import ErrorAlert from '../errors/ErrorAlert';
import TextInput from '../input/TextInput';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import { UserContext } from '../../context/users/UserState';

export default function UserMenu(props) {

    const context = useContext(UserContext);
    let userList = <ElementList as={ User } 
                        elements={ context.users }
                        isLoading={ context.isLoading }
                        emptyElementsMessage={ "No users to display at the moment" }
                        keyExtractor={ user => user.id } />

    if (context.loadingErrors) { // an error occurred, show it
        userList = <ErrorAlert title="Cannot load users"
                                text="The service is temporarily unavailable"
                                onRetry= { context.load } />
    }

    let newUserErrors = null;
    if (context.addingErrors) {
        if (context.addingErrors.fieldErrors) {
            newUserErrors = <FieldValidationErrors errors={ context.addingErrors.fieldErrors } />;
        }
        else if (context.addingErrors.generic) {
            newUserErrors = <ErrorAlert text={ context.addingErrors.generic } />
        }
    }

    return (
        <div className="mt-5">
            <div className="mb-3">
                <TextInput onAdd={ context.add }
                            buttonText="Add User"
                            isLoading={ context.isAdding }
                            placeholder="Username" />
            </div>
            { newUserErrors }
            { userList }
        </div>
    );    
}
