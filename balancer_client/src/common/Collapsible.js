import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

export default function Collapsible(props) {

    const [open, setOpen] = useState(true);

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" onClick={() => setOpen(!open) }>
                    <span>{ props.title } {open ? <i class="fa fa-angle-up"></i> : <i class="fa fa-angle-down"></i> }</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        { props.children }
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}