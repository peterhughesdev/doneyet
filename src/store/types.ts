import { Timer } from  '../util/timer';

export interface QueueState {
    timers: Timer[];
    scheduledDate: number;
}

export const TOGGLE_REPEAT = 'TOGGLE_REPEAT';

export const ADD_TIMER = 'ADD_TIMER';
export const REMOVE_TIMER = 'REMOVE_TIMER';
export const SCHEDULE_TIMER = 'SCHEDULE_TIMER'

export const CLEAR_QUEUE = 'CLEAR_QUEUE'
export const REORDER_QUEUE = 'REORDER_QUEUE'
export const SCHEDULE_QUEUE = 'SCHEDULE_QUEUE';

interface ToggleRepeatAction {
    type: typeof TOGGLE_REPEAT,
    payload: Timer
}

interface ClearQueueAction {
    type: typeof CLEAR_QUEUE
}

interface ReorderQueueAction {
    type: typeof REORDER_QUEUE,
    payload: {
        timers: Timer[]
    }
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

interface ScheduleQueueAction {
    type: typeof SCHEDULE_QUEUE,
    payload: {
        seconds: number
    }
}

export type QueueActions = ToggleRepeatAction | ReorderQueueAction | ClearQueueAction | AddTimerAction | RemoveTimerAction | ScheduleTimerAction | ScheduleQueueAction;