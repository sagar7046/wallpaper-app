
import { lightTheme, darkTheme } from '../config/Theme';
import { combineReducers } from '@reduxjs/toolkit';
import { english } from '../config/strings';

const initialState = {
    theme: lightTheme,
    language: english,
}

export const action = {
    SWITCH_THEME: "SWITCH_THEME",
    SWITCH_LANGUAGE: "SWITCH_LANGUAGE"
}

const themeReducer = (state = initialState, actionType) => {
    switch (actionType.type) {
        case action.SWITCH_THEME:
            return { ...state, theme: actionType.theme }
            break;
        case action.SWITCH_LANGUAGE:
            return { ...state, language: actionType.language }
            break;
        default:
            return state;
    }
}

export default combineReducers({
    theme: themeReducer
});
