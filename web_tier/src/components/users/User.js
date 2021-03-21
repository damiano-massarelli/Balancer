import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import UserApiStub from '../../apiStubs/UserApiStub';

/**
 * Displays basic information on a single user.
 */
export default function User(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [net, setNet] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await UserApiStub.getNet(props.data.id);
            if (!result.errors) {
                setNet(result.net);
            }
            else {
                setNet(0);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [setIsLoading, props, setNet]);

    
    let netElement = <Spinner animation="grow" />
    if (!isLoading) {
        netElement = (<Badge variant={net < 0 ? "danger" : "success"}>
            {net} <span> &euro;</span>
        </Badge>);
    }

    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title><i className="fa fa-user"></i> {props.data.name} {netElement}</Card.Title>
            </Card.Body>
        </Card>
    )
}