import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 * Shows an error alert.
 */
export default class ErrorAlert extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: true
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onRetry = this.onRetry.bind(this);
    }

    onDismiss() {
        this.setState( { show: false } );
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    onRetry() {
        if (this.props.onRetry) {
            this.props.onRetry();
        }
    }
 
    render() {
        let retryButton = null;
        if (this.props.onRetry) {
            retryButton = <Button onClick={ this.onRetry }>Retry <i className="fa fa-refresh"></i></Button>;
        }

        return (
            <Alert variant="danger" show={ this.state.show } onClose={ this.onDismiss } dismissible>
                <Alert.Heading> { this.props.title } </Alert.Heading>
                <p> { this.props.text } </p>  
                { retryButton }
            </Alert>
        );
    }

}
