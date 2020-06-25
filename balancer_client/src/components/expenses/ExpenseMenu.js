import React, { useState, useEffect } from 'react';
import ExpenseInput from './ExpenseInput';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import ElementList from '../common/ElementList';
import ExpenseApiStub from '../../apiStubs/ExpenseApiStub';
import Transaction from './Transaction'

export default function TransactionMenu(props) {

    const [expenses, setExpenses] = useState([]);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
    const [errors, setErrors] = useState([]);

    const onTransactionDeleted = (transactionId) => {
        setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingExpenses(true);
            const result = await ExpenseApiStub.getTransactions();
            console.log(result);
            if (result.errors) {
                setTransactions([]);
            }
            else {
                setTransactions(decorateTransaction(result.transactions));
            }
            setErrors(result.errors);

            setIsLoadingExpenses(false);
        };
        fetchData();
    }, [setTransactions, setIsLoadingExpenses, setErrors]);

    let errorElement = null;
    if (errors) {
        if (errors.generic) {
            errorElement = <ErrorAlert text={errors.generic} />;
        }
    }

    return (
        <div className="mt-5">
            <ElementList as={Transaction}
                elements={transactions}
                isLoading={isLoadingExpenses}
                onTransactionDeleted={onTransactionDeleted}
                emptyElementsMessage={"No transactions to display at the moment"}
                keyExtractor={transaction => transaction.id} />

            {errorElement}
        </div>
    );
}
