import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { AsyncStorage } from 'react-native';

import { QueueState, QueueActions, TOGGLE_REPEAT, CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, REORDER_QUEUE, ScheduleState, ScheduleActions, SCHEDULE_TIMERS, STOP_TIMERS, PAUSE_TIMERS } from './types';
import { ThemeState, ThemeActions, SET_THEME } from './types';
import { schedule, unschedule } from '../util/scheduler';

const initialThemeState: ThemeState = {
    active: 'default'
}

const themeReducer = (
    state = initialThemeState,
    action: ThemeActions) : ThemeState => {

    switch (action.type) {
        case SET_THEME: 
            return {
                ...state,
                active: action.theme
            }
        default:
            return state;
    }
}

const initialQueueState: QueueState = {
    timers: []
}

const queueReducer = (
    state = initialQueueState, 
    action: QueueActions) : QueueState => {

    switch (action.type) {
        case REORDER_QUEUE:
            return {
                ...state,
                timers: action.payload.timers
            }
        case CLEAR_QUEUE:
            return {
                ...state,
                timers: []
            }
        case TOGGLE_REPEAT:
            return {
                ...state,
                timers: state.timers.map(timer => {
                    if (timer.id === action.payload.id) {
                        return {
                            ...timer,
                            repeats: !timer.repeats
                        }
                    } else {
                        return timer;
                    }
                })
            }
        case ADD_TIMER:
            return {
                ...state,
                timers: [...state.timers, action.payload]
            }
        case REMOVE_TIMER:
            return {
                ...state,
                timers: state.timers.filter(timer => timer.id != action.payload.id)
            }
        default: 
            return state;
    }
}

const initialScheduleState: ScheduleState  =  {
    state: 'STOPPED',
    start: 0,
    paused: 0,
    timers: []
}

const scheduleReducer = (
    state = initialScheduleState,
    action: ScheduleActions) : ScheduleState => {

    switch (action.type) {
        case SCHEDULE_TIMERS:
            let start;

            if (state.state === 'PAUSED') {
                schedule(action.payload.timers, (state.paused - state.start) / 1000);
                start = state.start;
            } else {
                schedule(action.payload.timers);
                start = Date.now();
            }
            
            return {
                state: 'RUNNING',
                start,
                paused: 0,
                timers: [...action.payload.timers]
            }

        case STOP_TIMERS:
            unschedule(state.timers);
            
            return {
                state: 'STOPPED',
                start: 0,
                paused: 0,
                timers: []
            }
        case PAUSE_TIMERS:
            unschedule(state.timers);

            return {
                ...state,
                paused: Date.now(),
                state: 'PAUSED'
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    queue: queueReducer,
    theme: themeReducer,
    schedule: scheduleReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);