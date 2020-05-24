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

        let heading = null;
        if (this.props.title) {
            heading = <Alert.Heading> { this.props.title } </Alert.Heading>;
        }

        let text = null;
        if (this.props.text) {
            text = <p>{ this.props.text }</p>;
        }

        return (
            <Alert variant="danger" show={ this.state.show } onClose={ this.onDismiss } dismissible>
                { heading }
                { text }
                { this.props.children } 
                { retryButton }
            </Alert>
        );
    }

}
