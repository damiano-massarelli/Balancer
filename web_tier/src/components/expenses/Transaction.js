import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ExpenseApiStub from '../../apiStubs/ExpenseApiStub';
import ErrorAlert from '../errors/ErrorAlert';

import '../../App.css';

/**
 * Displays information on a single transaction.
 */
export default function Transaction(props) {

    const transaction = props.data;

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const markAsPaid = async () => {
        setIsLoading(true);
        const result = await ExpenseApiStub.deleteTransaction(transaction.from.id, transaction.to.id, transaction.amount);
        setIsLoading(false);
        if (!result.errors) {
            props.onTransactionDeleted(transaction.id);
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

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="transaction-title">
                    <span className="mr-1">{transaction.from.name}</span> <i className="fa fa-arrow-circle-right mr-1"></i>
                    <span className="mr-2">{transaction.to.name}</span>
                    <span className="badge badge-success"><span>{transaction.amount}</span> &euro;</span>
                </div>
                <div className="mt-2">
                    <Button variant="outline-secondary"
                        disabled={isLoading}
                        onClick={markAsPaid}>
                        Mark as paid <i className="fa fa-check-circle"></i> {loadingSpinner}
                    </Button>
                </div >
                {errorElement}
            </Card.Body >
        </Card >
    )
}
