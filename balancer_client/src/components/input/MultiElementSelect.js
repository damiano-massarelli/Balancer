import React from 'react';
import Form from 'react-bootstrap/Form';
import ElementSelect from './ElementSelect.js';

function RowElement(props) {
    const innerElement = React.createElement(props.as, props);
    const chosenId = props.id ? props.id : "";
    return (
        <tr>
            <td>
                <Form.Check
                    inline
                    custom
                    name="multiElementSelectInner"
                    label={innerElement}
                    type="checkbox"
                    onChange={event => props.onChange(event.target.checked, props.element)}
                    id={chosenId + "_innerRowElement" + props.innerId}
                />
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

    const onSelect = (previousElements, selected, element) => {
        if (selected) {
            return [...previousElements, element];
        }
        else {
            // remove the deselected element
            return previousElements.filter(e => e !== element);
        }
    }

    return <ElementSelect {...props}
        rowComponent={RowElement}
        onSelect={onSelect}
    />;
}
