import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ExpenseApiStub from '../../apiStubs/ExpenseApiStub';
import ErrorAlert from '../errors/ErrorAlert';
import ElementList from '../common/ElementList';

import '../../App.css';

function DebtorToDebt(props) {
    const { debtor, debt } = props.data;
    return (
        <>
            <span className="mr-1"><i className="fa fa-user"></i> {debtor.name}</span>
            <span className="badge badge-danger mr-2"><span>{debt}</span> &euro;</span>
        </>
    );
}

/**
 * Displays information on a single expense.
 */
export default function Expense(props) {
    const expense = props.data;

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const deleteExpense = async () => {
        setIsLoading(true);
        const result = await ExpenseApiStub.deleteExpense(expense.id);
        setIsLoading(false);
        if (!result.errors) {
            props.onExpenseDeleted(expense.id);
        }
        else {
            setErrors(result.errors);
        }
    }

    let loadingSpinner = null;
    if (isLoading) {
        loadingSpinner = <Spinner animation="grow" size="sm" />
    }

    let errorElement = null;
    if (errors && errors.generic) {
        errorElement = (
            <div className="mt-2">
                <ErrorAlert text={errors.generic} ></ErrorAlert>
            </div>
        );
    }

    const debtorToDebt = expense.debtorToDebt._embedded ? expense.debtorToDebt._embedded.debtorToDebtModelList : [];

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="mb-3">
                    <h5 className="expense-title">{expense.title}</h5>
                    <span className="ml-2">{`(${expense.date})`}</span><br />
                    Creditor: <span><i className="fa fa-user"></i> {expense.creditor.name}</span>
                    <span className="badge badge-success ml-2"><span>{expense.amount}</span> &euro;</span>
                </div>
                <Button variant="outline-danger"
                    className="float-right float-top"
                    disabled={isLoading}
                    onClick={deleteExpense}>
                    <i className="fa fa-trash"></i> {loadingSpinner}
                </Button>
                <span>Debtors: </span>
                <ElementList as={DebtorToDebt}
                    elements={debtorToDebt}
                    keyExtractor={data => data.debtor.id} />
                {errorElement}
            </Card.Body >
        </Card >
    )
}
