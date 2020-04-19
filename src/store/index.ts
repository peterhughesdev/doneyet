import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { AsyncStorage } from 'react-native';

import { createTimer } from  '../util/timer';

import { QueueState, QueueActions, TOGGLE_REPEAT, CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, SCHEDULE_TIMER, SCHEDULE_QUEUE, REORDER_QUEUE } from './types';

const initialQueueState: QueueState = {
    timers: [],
    scheduledDate: 0
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
        case SCHEDULE_TIMER: 
            return {
                ...state,
                timers: state.timers.map(timer => {
                    if (timer.id == action.payload.id) {
                        const scheduled = timer.scheduled.concat(action.payload.scheduled);

                        return {
                            ...timer,
                            scheduled
                        }
                    } else {
                        return timer;
                    }
                })
            }
        case SCHEDULE_QUEUE:
            const future = Date.now() + (action.payload.seconds * 1000);

            return {
                ...state,
                scheduledDate: future
            };
        
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    queue: queueReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);