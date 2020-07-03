export const actionTypes = {
    START_GET_ALL: Symbol("START_GET_ALL"),
    FINISH_GET_ALL: Symbol("END_GET_ALL"),

    START_ADD: Symbol("START_ADD"),
    FINISH_ADD: Symbol("FINISH_ADD")
};

export const reducer = (state, action) => {
    switch(action.type) {
        /* Load all users */
        case actionTypes.START_GET_ALL:
            return {
                ...state,
                loadingErrors: null,
                isLoading: true
            };
        case actionTypes.FINISH_GET_ALL:
            if (action.data.errors) {
                return {
                    ...state,
                    isLoading: false,
                    loadingErrors: action.data.errors
                };
            }
            else {
                return {
                    ...state,
                    isLoading: false,
                    loadingErrors: null,
                    users: action.data.users
                };
            }
        
        /* Add single user */
        case actionTypes.START_ADD:
            return {
                ...state,
                isAdding: true,
                addingErrors: null
            };
        case actionTypes.FINISH_ADD:
            if (action.data.errors) {
                return {
                    ...state,
                    isAdding: false,
                    addingErrors: action.data.errors
                };
            }
            else {
                return {
                    ...state,
                    users: [action.data.user, ...(state.users)],
                    isAdding: false
                };
            }
        default:
            return state;
    }
}