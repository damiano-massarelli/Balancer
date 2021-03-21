import React, { useState, useEffect } from 'react';
import ExpenseInput from './ExpenseInput';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import ElementList from '../common/ElementList';
import ExpenseApiStub from '../../apiStubs/ExpenseApiStub';
import Transaction from './Transaction'

const decorateTransaction = (transactions) => {
    return transactions.map((transaction, i) => ({ ...transaction, id: i }));
}

export default function TransactionMenu(props) {

    const [transactions, setTransactions] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [errors, setErrors] = useState(null);
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

    const onAdd = async (name, numericAmount, creditorId, userDebtorsIds, userIdToExtra, groupDebtorsIds) => {
        setErrors(null);
        setIsAdding(true);
        const result = await ExpenseApiStub.post(name, numericAmount, creditorId,
            userDebtorsIds, groupDebtorsIds, userIdToExtra);
        setIsAdding(false);
        setErrors(result.errors);
        if (!result.errors) {
            setTransactions(decorateTransaction(result.transactions));
        }
    };

    const onTransactionDeleted = (transactionId) => {
        setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingTransactions(true);
            const result = await ExpenseApiStub.getTransactions();
            if (result.errors) {
                setTransactions([]);
            }
            else {
                setTransactions(decorateTransaction(result.transactions));
            }
            setErrors(result.errors);

            setIsLoadingTransactions(false);
        };
        fetchData();
    }, [setTransactions, setIsLoadingTransactions, setErrors]);

    let errorElement = null;
    if (errors) {
        if (errors.generic) {
            errorElement = <ErrorAlert text={errors.generic} />;
        }
        else if (errors.fieldErrors) {
            errorElement = <FieldValidationErrors errors={errors.fieldErrors} />;
        }
    }

    return (
        <div className="mt-5">
            <div className="mb-3">
                <ExpenseInput onAdd={onAdd}
                    isAdding={isAdding} />
            </div>
            {errorElement}
            <ElementList as={Transaction}
                elements={transactions}
                isLoading={isLoadingTransactions}
                onTransactionDeleted={onTransactionDeleted}
                emptyElementsMessage={"No transactions to display at the moment"}
                keyExtractor={transaction => transaction.id} />
        </div>
    );
}
