import React from 'react';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

function GroupMember(props) {
    return (
        <Badge variant="secondary" className="mr-2"><i className="fa fa-user"></i> {props.name} </Badge>
    );
}

export default function Group(props) {

    const userList = props.data.members._embedded.userList;

    const members = userList.map(member => <GroupMember key={member.id} name={member.name} />)

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title><i className="fa fa-users"></i> {props.data.name}</Card.Title>
                {members}
            </Card.Body>
        </Card>
    );
}