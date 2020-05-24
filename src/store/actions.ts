import { Timer } from '../util/timer';
import { Theme } from '../util/theme';

import { SET_THEME, ThemeActions } from './types';
import { TOGGLE_REPEAT, CLEAR_QUEUE, ADD_TIMER, REMOVE_TIMER, SCHEDULE_TIMER, REORDER_QUEUE, QueueActions } from './types';

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

export const scheduleTimer = (id: string, scheduled: string) : QueueActions  => {
    return {
        type: SCHEDULE_TIMER,
        payload: {
            id,
            scheduled
        }
    }
}