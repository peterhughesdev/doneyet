
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

export function schedule(timers: Timer[], skip: number = 0) {
    const totalTime = getTotalSecondsForTimers(timers);

    // Walk through all timers, accumulating the total time all 
    // preceeding timers will take.
    timers.reduce((accumulated, timer, idx) => {
        let offset = accumulated + timer.time;
      
        // If the accumulated time for all timers including this one
        // is less than the provided skip, don't schedule any notifications.
        if (skip > offset) {
            return offset;
        }

        // If the number of seconds to skip puts us in the middle of a timer,
        // subtract the difference from calculated offset
        if (skip > accumulated) {
            offset - (skip - accumulated);
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
            scheduleNotification(offset - skip, false, title, body);
            return offset;
        }
    }, 0);
}

export function unschedule(timers: Timer[]) {
    cancelAllNotifications();
}