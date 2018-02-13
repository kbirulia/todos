import {initialState} from "../model/InitialState";
import {SWITCH_CONTENT_ACTION} from "../actions/contentActions";

export const content = (state = initialState.content, action) => {
    switch (action.type) {
        case SWITCH_CONTENT_ACTION: {
            return action.content;
        }
        default:
            return state;
    }
};