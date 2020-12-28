
import { scheduleNotification, cancelNotification, cancelAllNotifications } from '../util/notifications';
import { getTotalSeconds, Timer } from './timer';

const title = "Do the thing NOW...";

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

export const seconds = [0, 20, 30, 45];
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

export const hasRunningTimers = (timers: Timer[]) : boolean => {
    const now = Date.now();

    return timers.filter(timer => timer.scheduled.filter(schedule => {
        return schedule.start + getTotalSeconds(timer) > now;
    }).length).length > 0;
}

export const scheduleTimers = (timers: Timer[], onScheduled: (timer: Timer, id: string) => void) => {
    timers.reduce((accumulated, timer) => {
        const addSchedule = (id: string) => onScheduled(timer, id);
        const seconds = getTotalSeconds(timer);
        const body = `${seconds} has elapsed`; 

        if (timer.repeats) {
            if (seconds >= 60) {
                scheduleNotification(seconds, true, title, body).then(addSchedule);
            } else {
                iterateIntervalSequence(seconds, (timeout, intervalRepeat) => {
                    scheduleNotification(timeout, intervalRepeat, title, body).then(addSchedule);
                });
            }

            return accumulated;
        } else {
            const offset = accumulated + seconds;

            scheduleNotification(offset, false, title, body).then(addSchedule);

            return offset;
        }
    }, 0);
}

export const unscheduleTimers = (timers: Timer[]) => {
    cancelAllNotifications();

    const unscheduled = timers.map(timer => {
        return {
            ...timer,
            scheduled: []
        }
    });

    return unscheduled;
}

export const unscheduleTimer = (timer: Timer) =>  {
    timer.scheduled.forEach(async (schedule) => {
        try {
            await cancelNotification(schedule.id);
        } catch (e) {
            // no-op
        }
    });

    return {
        ...timer,
        scheduled: []
    };
}