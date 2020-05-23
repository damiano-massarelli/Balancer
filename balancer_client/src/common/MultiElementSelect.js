import React from 'react';
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
export default class MultiElementSelect extends React.Component {

    constructor(props) {
        super(props);

        this.selectedElements = [];

        this.onChange = this.onChange.bind(this);
    }

    onChange(selected, element) {
        if (selected) {
            this.selectedElements = this.selectedElements.slice();
            this.selectedElements.push(element);
        }
        else {
            // remove the deselected element
            this.selectedElements = this.selectedElements.filter(e => e !== element);
        }

        this.props.onChange(this.selectedElements);
    }

    render() {

        const rows = this.props.elements.map(element => <RowElement key={ this.props.keyExtractor(element) }
                                                                    as={ this.props.as }
                                                                    element={ element }
                                                                    innerId={ this.props.keyExtractor(element) }
                                                                    onChange={ this.onChange }  />);

        if (this.props.isLoading) {
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
}
