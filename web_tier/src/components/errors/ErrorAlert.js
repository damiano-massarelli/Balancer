import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 * Shows an error alert.
 */
export default function ErrorAlert(props) {

    const [show, setShow] = useState(true);

    const onDismiss = () => {
        setShow(false);
        if (props.onDismiss) {
            props.onDismiss();
        }
    }

    const onRetry = () => {
        if (props.onRetry) {
            props.onRetry();
        }
    }
 

    let retryButton = null;
    if (props.onRetry) {
        retryButton = <Button onClick={ onRetry }>Retry <i className="fa fa-refresh"></i></Button>;
    }

    let heading = null;
    if (props.title) {
        heading = <Alert.Heading> { props.title } </Alert.Heading>;
    }

    let text = null;
    if (props.text) {
        text = <p>{ props.text }</p>;
    }

    return (
        <Alert variant="danger" show={ show } onClose={ onDismiss } dismissible>
            { heading }
            { text }
            { props.children } 
            { retryButton }
        </Alert>
    );
}
