import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

/**
 * Allows the user to select elements using a certain logic.
 * An additional element can be passed using 'as' to decide how
 * elements should be displayed.
 */
export default function ElementSelect(props) {

    const [selectedElements, setSelectedElements] = useState([]);

    const { onChange } = props;
    useEffect(() => { onChange(selectedElements) }, [selectedElements, onChange]);

    const onChangeCallback = (...params) => {
        const updatedElements = props.onSelect(selectedElements, ...params);
        setSelectedElements(updatedElements);
    }

    const rows = props.elements.map(element => React.createElement(props.rowComponent, {
        key: props.keyExtractor(element),
        element,
        innerId: props.keyExtractor(element),
        onChange: onChangeCallback,
        ...props,
    }));

    if (props.isLoading) {
        return (
            <div className="text-center mb-3">
                <Spinner animation="grow" />
            </div>
        );
    }

    return (
        <Table striped bordered hover>
            <tbody>
                { rows }
            </tbody>
        </Table>
    );
}
