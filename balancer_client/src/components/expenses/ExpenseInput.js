import React, { useState, useContext, useEffect } from 'react';
import TextInput from '../input/TextInput';
import MultiElementSelect from '../input/MultiElementSelect';
import ErrorAlert from '../errors/ErrorAlert';
import Collapsible from '../common/Collapsible';
import NameAmountInput from './NameAmountInput';
import DebtorSelect from './DebtorSelect';
import SingleElementSelect from '../input/SingleElementSelect';
import { UserContext } from '../../context/users/UserState';

export default function ExpenseInput(props) {

    const userContext = useContext(UserContext);
    const [users, setUsers] = useState([]);

    // add users some more data to identify them
    useEffect(() => {
        setUsers(userContext.users.map(user => { 
            return {
                ...user,
                type: "user",
                extra: 0
            };
        }));
    }, [userContext.users]);

    const onExtraChanged = (userId, extra) => {
        const copy = users.slice();
        copy.find(user => user.id === userId).extra = extra;
        setUsers(copy);
    }

    return (
        <>
            <NameAmountInput onAdd={ null }
                        buttonText="Add Expense"
                        isLoading={ false } />

            <DebtorSelect id="debtorSelect"
                        elements={ users }
                        keyExtractor={ element => element.id }
                        onChange={ () => {}}
                        onExtraChanged={ onExtraChanged }
                        isLoading = { userContext.isLoading } />

            <SingleElementSelect id="payerSelect"
                        elements={ userContext.users }
                        keyExtractor={ element => element.id }
                        onChange={ () => {}}
                        isLoading = { userContext.isLoading }
                        as={ (props) => <span>{props.element.name}</span> } />
        </>
    );
}