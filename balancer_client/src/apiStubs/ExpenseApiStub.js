import { EXPSENSES_API_PATH } from './config';

export default class UserApiStub {
    static async _getData(path) {
        let result = { data: null, errors: {"generic": "The service is temporarily unavailable"} };
        
        let response = null;
        try {
            response = await fetch(path);
        }
        catch (_) {
            return result;
        }

        if (response.ok) { 
            const data = await response.json();

            result = {
                data, 
                errors: null
            };
        }

        return result;
    }

    static async getTransactions() {
        let result = { users:[], errors: {"generic": "The service is temporarily unavailable"} };
        let response = null;
        try {
            response = await fetch(EXPSENSES_API_PATH);
        }
        catch (_) {
            return result;
        }

        if (response.ok) { 
            const data = await response.json();

            result = {
                users: data._embedded ? data._embedded.userList : [], 
                errors: null
            };
        }

        return result;
    }

    static async post(title, amount, creditor, debtors, groups, debtorToExtra) {
        const expenseDTO = {
            title,
            amount,
            creditor,
            debtors,
            groups,
            debtorToExtra
        };

        let result = {transactions: null, errors: { generic: "The service is temporarily unavailable" }};
        let response = null;
        try {
            response = await fetch(EXPSENSES_API_PATH, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseDTO)
            });
        }
        catch (_) {
            return result;
        }

        const data = await response.json();
        if (response.ok) { // response is ok, data contains a user
            result = {transactions: data._embedded.transactionModelList, errors: null};
        }
        else if (response.status === 400) { // bad request, error details are stored in the response data
            result = {transactions: null, errors: data};
        }

        return result;
    }
}