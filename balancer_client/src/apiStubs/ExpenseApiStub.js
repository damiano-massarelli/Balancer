import { EXPSENSES_API_PATH } from './config';

export default class ExpenseApiStub {
    static async _request(uri, method, dataToSend) {
        let result = { data: null, errors: { "generic": "The service is temporarily unavailable" } };

        let response = null;
        try {
            response = await fetch(uri, {
                method,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });
        }
        catch (_) {
            return result;
        }

        let data = null;
        try {
            data = await response.json();
        }
        catch (_) { }

        if (response.ok) {
            result = {
                data,
                errors: null
            };
        }
        else if (response.status === 400) {
            result = { data: null, errors: data };
        }

        return result;
    }

    static async getTransactions() {
        const result = await ExpenseApiStub._request(EXPSENSES_API_PATH + "transactions/", 'GET');
        let transactions = null;
        if (result.data) {
            transactions = result.data._embedded ? result.data._embedded.transactionModelList : [];
        }
        return { transactions, errors: result.errors };
    }

    static async deleteTransaction(fromId, toId, amount) {
        const transactionDTO = {
            from: fromId,
            to: toId,
            amount
        };

        const result = await ExpenseApiStub._request(EXPSENSES_API_PATH + "transactions/", 'DELETE', transactionDTO);
        return { data: null, errors: result.errors };
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

        const result = await ExpenseApiStub._request(EXPSENSES_API_PATH, 'POST', expenseDTO);
        let transactions = null;
        if (result.data) {
            transactions = result.data._embedded ? result.data._embedded.transactionModelList : [];
        }

        return { transactions, errors: result.errors };
    }
}