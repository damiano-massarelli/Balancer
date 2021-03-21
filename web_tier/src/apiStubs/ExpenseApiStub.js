import { EXPSENSES_API_PATH } from './config';
import GenericApiStub from './GenericApiStub';

export default class ExpenseApiStub {

    static async getTransactions() {
        const result = await GenericApiStub.request(EXPSENSES_API_PATH + "transactions/", 'GET');
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

        const result = await GenericApiStub.request(EXPSENSES_API_PATH + "transactions/", 'DELETE', transactionDTO);
        console.log(result)
        return { data: null, errors: result.errors };
    }

    static async getExpenses() {
        const result = await GenericApiStub.request(EXPSENSES_API_PATH + "history/", 'GET');
        let expenses = null;
        if (result.data) {
            expenses = result.data._embedded ? result.data._embedded.expenseModelList : [];
        }
        return { expenses, errors: result.errors };
    }

    static async deleteExpense(expenseId) {
        const result = await GenericApiStub.request(EXPSENSES_API_PATH + `history/${expenseId}`, 'DELETE');
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

        const result = await GenericApiStub.request(EXPSENSES_API_PATH, 'POST', expenseDTO);
        let transactions = null;
        if (result.data) {
            transactions = result.data._embedded ? result.data._embedded.transactionModelList : [];
        }

        return { transactions, errors: result.errors };
    }
}