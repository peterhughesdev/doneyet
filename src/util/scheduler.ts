
import { ScheduleState } from '../store/types';
import { scheduleNotification, cancelAllNotifications } from '../util/notifications';
import { getLabel, getLabelFromSeconds, getTotalSecondsForTimers, Timer } from './timer';

type IntervalSequence = {
    once: number[],
    repeat: number[]
}

const INTERVAL_SEQUENCES = new Map<number, IntervalSequence>();

INTERVAL_SEQUENCES.set(5, {
    once: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    repeat: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115]
});

INTERVAL_SEQUENCES.set(20, {
    once: [20, 40],
    repeat: [60, 80, 100]
});

INTERVAL_SEQUENCES.set(30, {
    once: [30],
    repeat: [60, 90]
});

INTERVAL_SEQUENCES.set(45, {
    once: [45, 90, 135],
    repeat: [180, 225, 270, 315]
});

INTERVAL_SEQUENCES.set(60, {
    once: [],
    repeat: [60]
});

export const seconds = [0, 5, 20, 30, 45];
export const minutes: number[] = Array.from({length: 60}, (x,i) => i);
export const hours: number[] = [0, 1, 2, 3, 4, 5];

export const intervals = {
    seconds,
    minutes,
    hours
}

const iterateIntervalSequence = (interval: number, callback: (timeout: number, repeat: boolean) => void) => {
    const sequence = INTERVAL_SEQUENCES.get(interval);

    if (sequence) {
        sequence.once.forEach(timeout => callback(timeout, false));
        sequence.repeat.forEach(timeout => callback(timeout, true));
    }
}

/**
 * Given a set of timers and a timestamp from when a schedule was begun,
 * find the currently active timer.
 * 
 * @param timers set of timers to identify
 * @param start the time the schedule was started
 * @param elapsed time already elapsed within the schedule
 */
export function currentTimer(timers: Timer[], start: number, elapsed: number) {
    const offset = elapsed + Math.floor((Date.now() - start) / 1000);

    let id = 0;

    timers.reduce((accumulated, timer, _id) => {
        if (offset >= accumulated && offset <= accumulated + timer.time) {
            id = _id;
        }

        return accumulated + timer.time;
    }, 0);

    return timers[id];
}

export function schedule(timers: Timer[], elapsed: number = 0) {
    const totalTime = getTotalSecondsForTimers(timers);

    // Walk through all timers, accumulating the total time all 
    // preceeding timers will take.
    timers.reduce((accumulated, timer, idx) => {
        let offset = accumulated + timer.time;
      
        // If the accumulated time for all timers including this one
        // is less than the provided elapsed time, don't schedule any notifications.
        if (elapsed > offset) {
            return offset;
        }

        // If the number of seconds elapsed puts us in the middle of a timer,
        // subtract the elapsed time from the current offset.
        // e.g.:
        // 30s - (45s - 40s) = 25s
        if (elapsed > accumulated) {
            offset = timer.time - (elapsed - accumulated);
        }

        const remaining = totalTime - offset;
        const title = `${getLabel(timer, 'Timer')} is done`;
        const body = (idx < timers.length - 1) ? 
            `${getLabel(timers[idx + 1])} is next (${getLabelFromSeconds(remaining)} remaining)` :
            'Timer queue complete';

        if (timer.repeats) {
            if (timer.time >= 60) {
                scheduleNotification(timer.time, true, title, body);
            } else {
                iterateIntervalSequence(timer.time, (timeout, intervalRepeat) => {
                    scheduleNotification(timeout, intervalRepeat, title, body);
                });
            }

            return accumulated;
        } else {
            scheduleNotification(offset, false, title, body);
            return offset;
        }
    }, 0);
}

export function unschedule(timers: Timer[]) {
    cancelAllNotifications();
}