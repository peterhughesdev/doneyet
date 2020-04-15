import { Timer } from  '../util/timer';

export interface QueueState {
    timers: Timer[]
}

export const CLEAR_QUEUE = 'CLEAR_QUEUE'

export const ADD_TIMER = 'ADD_TIMER';
export const REMOVE_TIMER = 'REMOVE_TIMER';
export const SCHEDULE_TIMER = 'SCHEDULE_TIMER'

interface ClearQueueAction {
    type: typeof CLEAR_QUEUE
}

interface AddTimerAction {
    type:  typeof ADD_TIMER,
    payload: Timer
}

interface RemoveTimerAction {
    type: typeof REMOVE_TIMER,
    payload: {
        id: string
    }
}

interface ScheduleTimerAction {
    type: typeof SCHEDULE_TIMER,
    payload: {
        id: string,
        scheduled: string
    }
}

export type QueueActions = ClearQueueAction | AddTimerAction | RemoveTimerAction | ScheduleTimerAction;