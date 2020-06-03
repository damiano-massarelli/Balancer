import { USER_API_PATH } from '../../config';

export default class UserApiStub {
    static async get() {
        let result = { users:[], errors: {"generic": "The service is temporarily unavailable"} };
        let response = null;
        try {
            response = await fetch(USER_API_PATH);
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

    static async post(username) {
        const userDto = {
            name: username
        };

        let result = {user: null, errors: { generic: "The service is temporarily unavailable" }};
        let response = null;
        try {
            response = await fetch(USER_API_PATH, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDto)
            });
        }
        catch (_) {
            return result;
        }

        const data = await response.json();
        if (response.ok) { // response is ok, data contains a user
            result = {user: data, errors: null};
        }
        else if (response.status === 400) { // bad request, error details are stored in the response data
            result = {user: null, errors: data};
        }

        return result;
    }
}