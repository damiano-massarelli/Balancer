import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

/**
 * Input component for a new user.
 */
export default class TextInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState( {username: event.target.value} );
    }

    render() {
        let loadingSpinner = null;
        if (this.props.isLoading) {
            loadingSpinner = <Spinner animation="grow" size="sm" />
        }

        return (
            <InputGroup className="mb-3">
                <FormControl placeholder="Username"
                             onChange={ this.handleChange }
                             value={ this.state.username } required />
                <InputGroup.Prepend>
                    <Button variant="outline-secondary"
                            disabled={ this.props.isLoading }
                            onClick={ () => this.props.onAdd(this.state.username) }>
                        Add User { loadingSpinner }
                    </Button>
                </InputGroup.Prepend>
            </InputGroup>
        );
    }
}
