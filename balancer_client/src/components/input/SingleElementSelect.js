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
                    name="singleElementSelectInner"
                    onChange={ () => props.onChange(props.element) }
                    label={ innerElement }
                    type="radio"
                    id={ chosenId + "_innerRowElement" + props.innerId }
                />
            </td>
        </tr>
    );
}

 /**
  * Allows the user to select a single element from a list.
  * An additional element can be passed using 'as' to decide how
  * elements should be displayed.
  */
export default function SingleElementSelect(props) {

    const onSelect = (previousElement, element) => [element];

    return <ElementSelect rowComponent={ RowElement }
                        onSelect={ onSelect }
                        { ...props } />;
}
