import React, { useState, useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapsible from '../common/Collapsible';
import NameAmountInput from './NameAmountInput';
import DebtorSelect from './DebtorSelect';
import SingleElementSelect from '../input/SingleElementSelect';
import { UserContext } from '../../context/users/UserState';
import { GroupContext } from '../../context/groups/GroupState';
import '../../App.css';

export default function ExpenseInput(props) {

    const userContext = useContext(UserContext);
    const groupContext = useContext(GroupContext);
    const [debtors, setDebtors] = useState([]);
    const [selectedDebtors, setSelectedDebtors] = useState([]);
    const [payer, setPayer] = useState(null);

    // add users some more data to identify them
    useEffect(() => {
        const userDebtors = userContext.users.map(user => {
            return {
                ...user,
                type: "user",
                extra: 0
            };
        });

        const groupDebtors = groupContext.groups.map(group => {
            return {
                ...group,
                type: "group"
            };
        });

        setDebtors([...userDebtors, ...groupDebtors]);
    }, [userContext.users, groupContext.groups]);

    const onExtraChanged = (userId, extra) => {
        const copy = debtors.slice();
        copy.find(user => user.id === userId).extra = extra;
        setDebtors(copy);
    };

    const onAdd = (name, amount) => {
        let numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
            numericAmount = 0;
        }
        const userDebtorsIds = userContext.users.filter(user => {
            return selectedDebtors.find(debtor => (debtor.type === "user" && debtor.id === user.id));
        }).map(user => user.id);

        const groupDebtorsIds = groupContext.groups.filter(group => {
            return selectedDebtors.find(debtor => (debtor.type === "group" && debtor.id === group.id));
        }).map(group => group.id);

        const userIdToExtra = new Map();
        selectedDebtors.filter(debtor => debtor.type === "user")
            .forEach(debtor => userIdToExtra[debtor.id] = debtor.extra);

        const payerId = payer ? payer.id : null;
        props.onAdd(name, numericAmount, payerId, userDebtorsIds, userIdToExtra, groupDebtorsIds);
    };

    return (
        <>
            <NameAmountInput onAdd={onAdd}
                buttonText="Add Expense"
                isLoading={props.isAdding} />
            <Collapsible title="members">
                <Row>
                    <Col className="pr-0">
                        <div className="table-righ-bordered">
                            <DebtorSelect id="debtorSelect"
                                title="Debtors"
                                elements={debtors}
                                keyExtractor={element => element.id}
                                onChange={selected => setSelectedDebtors(selected)}
                                onExtraChanged={onExtraChanged}
                                isLoading={userContext.isLoading} />
                        </div>
                    </Col>

                    <Col className="pl-0">
                        <SingleElementSelect id="payerSelect"
                            title="Creditor"
                            elements={userContext.users}
                            keyExtractor={element => element.id}
                            onChange={selected => setPayer(selected[0])}
                            isLoading={userContext.isLoading}
                            as={props => <span>{props.element.name}</span>} />
                    </Col>
                </Row>
            </Collapsible>
        </>
    );
}