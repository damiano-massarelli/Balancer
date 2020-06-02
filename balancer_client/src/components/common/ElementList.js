import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function ElementList(props) {

    let elementToDisplay = props.elements.map(elementData => React.createElement(props.as, { key: props.keyExtractor(elementData), data: elementData }));

    if (props.isLoading) { // loading, show spinner
        elementToDisplay = (
            <div className="text-center">
                <Spinner animation="grow" />
            </div>
        );
    }
    else if (props.elements.length === 0) { // no users to display
        elementToDisplay = (
            <div className="text-center">
                <i>{ props.emptyElementsMessage }</i>
            </div>
        )
    }

    return elementToDisplay;
}
