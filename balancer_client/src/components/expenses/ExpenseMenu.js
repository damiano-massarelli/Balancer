import React, { useState } from 'react';
import ExpenseInput from './ExpenseInput';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import ElementList from '../common/ElementList';
import ExpenseApiStub from '../../apiStubs/ExpenseApiStub';

export default function ExpenseMenu(props) {

    const [transactions, setTransactions] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    const onAdd = async (name, numericAmount, creditorId, userDebtorsIds, userIdToExtra, groupDebtorsIds) => {
        setIsAdding(true);
        const result = await ExpenseApiStub.post(name, numericAmount, creditorId,
            userDebtorsIds, groupDebtorsIds, userIdToExtra);
        setIsAdding(false);
        console.log(result);
    };

    return (
        <div className="mt-5">
            <div className="mb-3">
                <ExpenseInput onAdd={onAdd}
                isAdding={isAdding} />
            </div>
        </div>
    );
}
