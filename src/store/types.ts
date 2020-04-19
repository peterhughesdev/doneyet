import { Timer } from  '../util/timer';

export interface TimerState {
    timer: Timer;
    running: boolean
}

export interface QueueState {
    timers: Timer[];
    scheduledDate: number;
}

export const SET_TIMER = 'SET_TIMER';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';

export const ADD_TIMER = 'ADD_TIMER';
export const REMOVE_TIMER = 'REMOVE_TIMER';
export const SCHEDULE_TIMER = 'SCHEDULE_TIMER'

export const CLEAR_QUEUE = 'CLEAR_QUEUE'
export const REORDER_QUEUE = 'REORDER_QUEUE'
export const SCHEDULE_QUEUE = 'SCHEDULE_QUEUE';

interface SetTimerAction {
    type: typeof SET_TIMER,
    payload: Timer
}

interface StartTimerAction {
    type: typeof START_TIMER;
}

interface StopTimerAction {
    type: typeof STOP_TIMER;
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

export type QueueActions = ReorderQueueAction | ClearQueueAction | AddTimerAction | RemoveTimerAction | ScheduleTimerAction | ScheduleQueueAction;
export type TimerActions = SetTimerAction | StartTimerAction | StopTimerAction;