import React, { useState } from 'react';
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

    const onChangeCallback = (...params) => {
        const updatedElements = props.onSelect(selectedElements, ...params);
        setSelectedElements(updatedElements);
        onChange(updatedElements);
    }

    const rows = props.elements.map(element => React.createElement(props.rowComponent, {
        ...props,
        key: props.keyExtractor(element),
        element,
        innerId: props.keyExtractor(element),
        onChange: onChangeCallback,
    }));

    if (props.isLoading) {
        return (
            <div className="text-center mb-3">
                <Spinner animation="grow" />
            </div>
        );
    }

    let header = null;
    if (props.title) {
        header = (
            <thead>
                <tr>
                    <th>{ props.title }</th>
                </tr>
            </thead>
        );
    }

    return (
        <Table striped hover className="mb-0">
            { header }
            <tbody>
                { rows }
            </tbody>
        </Table>
    );
}
