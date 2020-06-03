import React, { createContext, useReducer, useEffect } from 'react';
import {reducer, actionTypes} from './UserReducer';
import UserApiStub from './UserApiStub';

// initial state
const initialState = {
    users: [],
    isLoading: false,
    isAdding: false,
    loadingErrors: null,
    addingErrors: null
};

export const UserContext = createContext(initialState);

// provider
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const load = async () => {
        dispatch({
            type: actionTypes.START_GET_ALL
        });
        const data = await UserApiStub.get();
        dispatch({
            type: actionTypes.FINISH_GET_ALL,
            data
        });
    };

    const add = async (username) => {
        dispatch({
            type: actionTypes.START_ADD
        });
        const data = await UserApiStub.post(username);
        dispatch({
            type: actionTypes.FINISH_ADD,
            data
        });
    }

    // always load users when mounted
    useEffect(() => {
        load();
    }, []);

    return (
        <UserContext.Provider value={ {...state, load, add} }>
            { children }
        </UserContext.Provider>
    );
}
