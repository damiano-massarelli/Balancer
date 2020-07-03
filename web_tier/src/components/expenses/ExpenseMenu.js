import React, { useState, useEffect } from 'react';
import ErrorAlert from '../errors/ErrorAlert';
import ElementList from '../common/ElementList';
import ExpenseApiStub from '../../apiStubs/ExpenseApiStub';
import Expense from './Expense';

export default function ExpenseMenu(props) {

    const [expenses, setExpenses] = useState([]);
    const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
    const [errors, setErrors] = useState([]);

    const onExpenseDeleted = (expenseId) => {
        setExpenses(expenses.filter(expense => expense.id !== expenseId));
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingExpenses(true);
            const result = await ExpenseApiStub.getExpenses();
            if (result.errors) {
                setExpenses([]);
            }
            else {
                setExpenses(result.expenses);
            }
            setErrors(result.errors);

            setIsLoadingExpenses(false);
        };
        fetchData();
    }, [setExpenses, setIsLoadingExpenses, setErrors]);

    let errorElement = null;
    if (errors) {
        if (errors.generic) {
            errorElement = <ErrorAlert text={errors.generic} />;
        }
    }

    return (
        <div className="mt-5">
            <ElementList as={Expense}
                elements={expenses}
                isLoading={isLoadingExpenses}
                onExpenseDeleted={onExpenseDeleted}
                emptyElementsMessage={"No expenses to display at the moment"}
                keyExtractor={expense => expense.id} />

            {errorElement}
        </div>
    );
}
