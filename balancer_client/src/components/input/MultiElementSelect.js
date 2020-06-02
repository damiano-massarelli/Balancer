import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function RowElement(props) {
    const innerElementProps = { element: props.element };
    const innerElement = React.createElement(props.as, innerElementProps);

    return (
        <tr>
            <td>
            <div className="custom-control custom-checkbox">
                <input type="checkbox"
                    className="custom-control-input"
                    id={ "_innerRowElement" + props.innerId }
                    onChange={ event => props.onChange(event.target.checked, props.element) } />
                <label className="custom-control-label" htmlFor={ "_innerRowElement" + props.innerId }>
                    { innerElement }
                </label>
            </div>
            </td>
        </tr>
    );
}

 /**
  * Allows the user to select multiple elements from a list.
  * An additional element can be passed using 'as' to decide how
  * elements should be displayed.
  */
export default function MultiElementSelect(props) {

    const [selectedElements, setSelectedElements] = useState([]);

    const { onChange } = props;
    useEffect(() => { onChange(selectedElements) }, [selectedElements, onChange]);

    const onSelection = (selected, element) => {
        if (selected) {
            setSelectedElements(previousElements => [...previousElements, element]);
        }
        else {
            // remove the deselected element
            const filtered = selectedElements.filter(e => e !== element);
            setSelectedElements(filtered);
        }
    }

    const rows = props.elements.map(element => <RowElement key={ props.keyExtractor(element) }
                                                                as={ props.as }
                                                                element={ element }
                                                                innerId={ props.keyExtractor(element) }
                                                                onChange={ onSelection }  />);

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
