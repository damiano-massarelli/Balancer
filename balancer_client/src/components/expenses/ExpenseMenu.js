import React, { useContext } from 'react';
import ExpenseInput from './ExpenseInput';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import ElementList from '../common/ElementList';

export default function ExpenseMenu(props) {

    const onAdd = (name, numericAmount, payerId, userDebtorsIds, userIdToExtra, groupDebtorsIds) => {
        console.log(name);
        console.log(numericAmount);
        console.log(payerId);
        console.log(userDebtorsIds, userIdToExtra, groupDebtorsIds);
    };

    return (
        <div className="mt-5">
            <div className="mb-3">
                <ExpenseInput onAdd={onAdd} />
            </div>
        </div>
    );
}
