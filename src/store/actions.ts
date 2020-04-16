import { Timer } from '../util/timer';
import { CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, SCHEDULE_TIMER, SCHEDULE_QUEUE, QueueActions } from './types';
import { SET_TIMER, START_TIMER, STOP_TIMER, TimerActions } from './types';

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

export const scheduleQueue = (seconds: number) : QueueActions => {
    return {
        type: SCHEDULE_QUEUE,
        payload: {
            seconds
        }
    }
}

export const setTimer = (timer: Timer) : TimerActions => {
    return {
        type: SET_TIMER,
        payload: timer
    }
}

export const startTimer = () : TimerActions => {
    return  {
        type: START_TIMER
    }
}

export const stopTimer = () : TimerActions => {
    return  {
        type: STOP_TIMER
    }
}