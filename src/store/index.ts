import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import { AsyncStorage } from 'react-native';

import { createTimer } from  '../util/timer';

import { QueueState, QueueActions, CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, SCHEDULE_TIMER} from './types';

const initialState: QueueState = {
    timers: []
}

const queueReducer = (
    state = initialState, 
    action: QueueActions) : QueueState => {

    switch (action.type) {
        case CLEAR_QUEUE:
            return {
                timers: []
            }
        case ADD_TIMER:
            return {
                timers: [...state.timers, createTimer(action.payload.seconds)]
            }
        case REMOVE_TIMER:
            return {
                timers: state.timers.filter(timer => timer.id != action.payload.id)
            }
        case SCHEDULE_TIMER: 
            return {
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