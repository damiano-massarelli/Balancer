import { GROUPS_API_PATH } from '../config';

export default class GroupUtils {
    static async postGroup(groupDTO) {
        let response = null;
        try {
            response = await fetch(GROUPS_API_PATH, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupDTO)
            });
        }
        catch (e) {
            return { errorAddingGroup: { generic: "The service is temporarily unavailable" } };
        }

        const data = await response.json();
        const result = {
            group: null,
            errorAddingGroup: null
        };
        if (response.ok) {
            result.group = data;
        }
        else if (response.status === 400) { // bad request, error details are stored in the response data
            result.errorAddingGroup = data;
        }

        return result;
    }
} 