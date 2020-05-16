import React from 'react';
import ErrorAlert from './ErrorAlert';

export default function FieldValidationErrors(props) {
    if (!props.errors) {
        return null;
    }

    const alerts = props.errors.map(error => <ErrorAlert key={ error.fieldName }
                                                         text={ `${error.fieldName} ${error.errorMessage}`  } />);

    return alerts;
}