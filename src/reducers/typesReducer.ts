import {initialState} from "../model/InitialState";
import {ADD_TYPES_ACTION} from "../actions/typesActions";

export const types = (state = initialState.types, action) => {
    switch (action.type) {
        case ADD_TYPES_ACTION: {
            return [...state, ...action.types];
        }
        default:
            return state;
    }
};