import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { AsyncStorage } from 'react-native';

import { createTimer } from  '../util/timer';

import { QueueState, QueueActions, CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, SCHEDULE_TIMER, SCHEDULE_QUEUE } from './types';
import { TimerState, TimerActions, SET_TIMER, START_TIMER, STOP_TIMER } from './types';

const initialTimerState: TimerState = {
    timer: createTimer(20),
    running: false
}

const timerReducer = (
    state = initialTimerState, 
    action: TimerActions) : TimerState => {

    switch (action.type) {
        case SET_TIMER:
            return {
                ...state,
                timer: action.payload
            }
        case START_TIMER:
            return {
                ...state,
                running: true
            }
        case STOP_TIMER:
            return {
                ...state,
                running: false
            }
        default:
            return state;
    }
}

const initialQueueState: QueueState = {
    timers: [],
    scheduledDate: 0
}

const queueReducer = (
    state = initialQueueState, 
    action: QueueActions) : QueueState => {

    switch (action.type) {
        case CLEAR_QUEUE:
            return {
                ...state,
                timers: []
            }
        case ADD_TIMER:
            return {
                ...state,
                timers: [...state.timers, createTimer(action.payload.seconds)]
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
                        const scheduled = action.payload.scheduled;

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
    front: timerReducer,
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