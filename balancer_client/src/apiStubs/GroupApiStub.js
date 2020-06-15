import { GROUPS_API_PATH } from './config';

export default class GroupApiStub {
    static async get() {
        let result = {groups: [], errors: {generic: "The service is temporarily unavailable"}};

        let response = null;
        try {
            response = await fetch(GROUPS_API_PATH);
        }
        catch (_) {
            return result;   
        }

        if (response.ok) { 
            const data = await response.json();
            result = {
                groups: data._embedded ? data._embedded.groupModelList : [], 
                errors: null
            };
        }

        return result;
    }

    static async post(groupName, members) {
        const groupDto = {
            name: groupName,
            userIds: members.map(user => user.id)
        };

        let result = { group: null, errors: {"generic": "The service is temporarily unavailable"} };

        let response = null;
        try {
            response = await fetch(GROUPS_API_PATH, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupDto)
            });
        }
        catch (_) {
            return result;
        }

        const data = await response.json();
        if (response.ok) {
            result.group = data;
            result.errors = null;
        }
        else if (response.status === 400) { // bad request, error details are stored in the response data
            result.errors = data;
        }

        return result;
    }
} 