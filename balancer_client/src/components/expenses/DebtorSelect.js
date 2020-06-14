import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import MultiElementSelect from '../input/MultiElementSelect';

function DebtorExtra(props) {
    let extraComponent = null;

    const [extra, setExtra] = useState(props.element.extra);
    const isUser = props.element.type === "user";

    const { onExtraChanged } = props;

    const updateExtra = (value) => {
        setExtra(value);
        let extraValue = parseFloat(value);
        extraValue = isNaN(extraValue) ? 0 : extraValue;
        onExtraChanged(props.element.id, extraValue);
    }

    if (isUser) {
        extraComponent = (
            <Col>
                <Form.Group className="mb-0">
                    <Form.Row>
                        <Form.Label>
                            Extra:
                        </Form.Label>
                        <Col>
                            <Form.Control onChange={event => updateExtra(event.target.value)}
                                value={extra}
                                type="number" />
                        </Col>
                    </Form.Row>
                </Form.Group>
            </Col>
        );
    }

    return (
        <Row>
            <Col>
                <span><i className={isUser ? "fa fa-user" : "fa fa-users"}></i> {props.element.name}</span>
            </Col>
            {extraComponent}
        </Row>
    );
}

export default function DebtorSelect(props) {
    return <MultiElementSelect {...props}
        as={DebtorExtra}
    />

}
