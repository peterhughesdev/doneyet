import { Timer } from '../util/timer';
import { CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, SCHEDULE_TIMER, QueueActions } from './types';

export const addTimer = (timer: Timer) : QueueActions => {
    return {
        type: ADD_TIMER,
        payload: timer
    }
}

export const removeTimer = (id: string) : QueueActions => {
    return {
        type:  REMOVE_TIMER,
        payload: {
            id
        }
    }
}

export const clearQueue = () : QueueActions => {
    return {
        type: CLEAR_QUEUE
    }
}

export const scheduleTimer = (id: string, scheduled: string) : QueueActions  => {
    return {
        type: SCHEDULE_TIMER,
        payload: {
            id,
            scheduled
        }
    }
}