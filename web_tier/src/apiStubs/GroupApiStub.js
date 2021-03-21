import { GROUPS_API_PATH } from './config';
import GenericApiStub from './GenericApiStub';

export default class GroupApiStub {
    static async get() {
        const result = await GenericApiStub.request(GROUPS_API_PATH, 'GET');
        let groups = [];
        if (result.data) {
            groups = result.data._embedded ? result.data._embedded.groupModelList : [];
        }

        return { groups, errors: result.errors };
    }

    static async post(groupName, members) {
        const groupDto = {
            name: groupName,
            userIds: members.map(user => user.id)
        };

        const result = await GenericApiStub.request(GROUPS_API_PATH, 'POST', groupDto);
        return { group: result.data, errors: result.errors };
    }
} 