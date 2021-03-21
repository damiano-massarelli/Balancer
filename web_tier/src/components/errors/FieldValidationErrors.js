import React from 'react';
import ErrorAlert from './ErrorAlert';

export default function FieldValidationErrors(props) {
    if (!props.errors) {
        return null;
    }

    const errorElements = props.errors.map(error => <li key={ error.fieldName }>{ error.errorMessage}</li>);

    return (
        <ErrorAlert title="Ops">
            <ul>
                { errorElements }
            </ul>
        </ErrorAlert>
    );
}