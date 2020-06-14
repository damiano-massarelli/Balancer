import React, { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

/**
 * Input component for a new user.
 */
export default function TextInput(props) {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    let loadingSpinner = null;
    if (props.isLoading) {
        loadingSpinner = <Spinner animation="grow" size="sm" />
    }

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            props.onAdd(name, parseFloat(amount));
        }
        }>
            <InputGroup>
                <FormControl placeholder={"Name"}
                    onChange={event => setName(event.target.value)}
                    value={name} required />
                <FormControl placeholder={"Amount"}
                    onChange={event => setAmount(event.target.value)}
                    value={amount} required />
                <InputGroup.Prepend>
                    <Button variant="outline-secondary"
                        type="submit"
                        disabled={props.isLoading}>
                        {props.buttonText} {loadingSpinner}
                    </Button>
                </InputGroup.Prepend>
            </InputGroup>
        </Form>
    );
}
