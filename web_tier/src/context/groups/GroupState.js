import React, { createContext, useReducer, useEffect } from 'react';
import {reducer, actionTypes} from './GroupReducer';
import GroupApiStub from '../../apiStubs/GroupApiStub';

// initial state
const initialState = {
    groups: [],
    isLoading: false,
    isAdding: false,
    loadingErrors: null,
    addingErrors: null
};

export const GroupContext = createContext(initialState);

// provider
export const GroupProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const load = async () => {
        dispatch({
            type: actionTypes.START_GET_ALL
        });
        const data = await GroupApiStub.get();
        dispatch({
            type: actionTypes.FINISH_GET_ALL,
            data
        });
    };

    const add = async (groupName, members) => {
        dispatch({
            type: actionTypes.START_ADD
        });
        const data = await GroupApiStub.post(groupName, members);
        dispatch({
            type: actionTypes.FINISH_ADD,
            data
        });
    }

    // always load groups when mounted
    useEffect(() => {
        load();
    }, []);

    return (
        <GroupContext.Provider value={ {...state, load, add} }>
            { children }
        </GroupContext.Provider>
    );
}
