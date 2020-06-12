import React, { useContext } from 'react';
import ExpenseInput from './ExpenseInput';
import ErrorAlert from '../errors/ErrorAlert';
import FieldValidationErrors from '../errors/FieldValidationErrors';
import ElementList from '../common/ElementList';

export default function ExpenseMenu(props) {

    return (
        <div className="mt-5">
            <div className="mb-3">
                <ExpenseInput  />
            </div>
        </div>
    );
}
