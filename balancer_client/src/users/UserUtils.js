import { USER_API_PATH } from '../config';

export default class UserUtils {
    static async loadUsers() {
        let response = null;
        try {
            response = await fetch(USER_API_PATH);
        }
        catch (e) {
            return { users:[], errorLoadingUsers: true };
            
        }

        let resultState = null;
        if (response.ok) { 
            const data = await response.json();

            resultState = {
                users: data._embedded ? data._embedded.userList : [], 
                errorLoadingUsers: false
            };
        }
        else {
            return { users:[], errorLoadingUsers: true };
        }

        return resultState;
    }
}