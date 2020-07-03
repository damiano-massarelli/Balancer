import { USER_API_PATH } from './config';
import GenericApiStub from './GenericApiStub';
import Group from '../components/groups/Group';

export default class UserApiStub {
    static async get() {
        const result = await GenericApiStub.request(USER_API_PATH, 'GET');

        let users = [];
        if (result.data) {
            users = result.data._embedded ? result.data._embedded.userList : []
        }

        return { users, errors: result.errors };
    }

    static async post(username) {
        const userDto = {
            name: username
        };

        const result = await GenericApiStub.request(USER_API_PATH, 'POST', userDto);
        return { user: result.data, errors: result.errors };
    }

    static async getNet(userId) {
        const result = await GenericApiStub.request(USER_API_PATH + `/net/${userId}`, 'GET');
        return { net: result.data, errors: result.errors };
    }
}