import { Timer } from  '../util/timer';

export interface ThemeState {
    active: string
}

export interface QueueState {
    timers: Timer[];
}

const RUNNING = 'RUNNING';
const STOPPED = 'STOPPED';
const PAUSED = 'PAUSED';

export type ScheduleRunningState = typeof RUNNING | typeof STOPPED | typeof PAUSED;

export interface ScheduleState {
    state: ScheduleRunningState;
    start: number;
    elapsed: number;
    timers: Timer[];
}

export const SET_THEME = 'SET_THEME';

interface SetThemeAction {
    type: typeof SET_THEME,
    theme: string
}

export type ThemeActions = SetThemeAction;

export const TOGGLE_REPEAT = 'TOGGLE_REPEAT';

export const ADD_TIMER = 'ADD_TIMER';
export const REMOVE_TIMER = 'REMOVE_TIMER';
export const CLEAR_QUEUE = 'CLEAR_QUEUE'
export const REORDER_QUEUE = 'REORDER_QUEUE'

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

export type QueueActions = ToggleRepeatAction | ReorderQueueAction | ClearQueueAction | AddTimerAction | RemoveTimerAction;

export const SCHEDULE_TIMERS = 'SCHEDULE_TIMERS';
export const STOP_TIMERS =  'STOP_TIMERS';
export const PAUSE_TIMERS =  'PAUSE_TIMERS';

interface ScheduleTimersAction {
    type: typeof SCHEDULE_TIMERS,
    payload: {
        timers: Timer[]
    }
};

interface StopTimersAction {
    type: typeof STOP_TIMERS
};

interface PauseTimersAction {
    type: typeof PAUSE_TIMERS
};

export type ScheduleActions = ScheduleTimersAction |  StopTimersAction | PauseTimersAction;