import { Timer } from '../util/timer';
import { Theme } from '../util/theme';

import { PAUSE_TIMERS, SCHEDULE_TIMERS, SET_THEME, STOP_TIMERS, ThemeActions } from './types';
import { TOGGLE_REPEAT, CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, REORDER_QUEUE, QueueActions, ScheduleActions } from './types';

export const setTheme = (theme: Theme) : ThemeActions => {
    return  {
        type: SET_THEME,
        theme: theme.name
    }
}

export const toggleRepeat = (timer: Timer) : QueueActions => {
    return {
        type: TOGGLE_REPEAT,
        payload: timer
    }
}

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

export const reorderQueue = (timers: Timer[]) : QueueActions => {
    return {
        type: REORDER_QUEUE,
        payload: {
            timers
        }
    }
}

export const clearQueue = () : QueueActions => {
    return {
        type: CLEAR_QUEUE
    }
}

export const scheduleTimers = (timers: Timer[]) : ScheduleActions => {
    return {
        type: SCHEDULE_TIMERS,
        payload: {
            timers
        }
    }
}

export const stopTimers = () : ScheduleActions => {
    return {
        type: STOP_TIMERS
    }
}

export const pauseTimers = () : ScheduleActions => {
    return {
        type: PAUSE_TIMERS
    }
}