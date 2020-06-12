import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import MultiElementSelect from '../input/MultiElementSelect';

function DebtorExtra(props) {
    let extraComponent = null;

    const [extra, setExtra] = useState(props.element.extra);
    const isUser = props.element.type === "user";

    const { onExtraChanged }= props; 
    // notify extra changed
    useEffect(() => {
        let extraValue = parseFloat(extra);
        extraValue = isNaN(extraValue) ? 0 : extraValue;
        onExtraChanged(props.element.id, extraValue);
    }, [extra]);

    if (isUser) {
        extraComponent = (
            <Form.Group>
                <Form.Label>
                    Extra: 
                </Form.Label>
                <Form.Control onChange={ event => setExtra(event.target.value) }
                            value={ extra } required />
            </Form.Group>
        );
    }

    return (
        <Row>
            <Col>
                <span><i className={isUser ? "fa fa-user" : "fa fa-users"}></i> { props.element.name }</span>
            </Col>
            <Col>
                { extraComponent }
            </Col>
        </Row>
    );
}

export default function DebtorSelect(props) {
    return <MultiElementSelect as={ DebtorExtra }
                            { ...props } />

}
