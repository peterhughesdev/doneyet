export interface Schedule {
    start: number,
    id: string
}

export interface Timer {
    id: string,
    seconds: number,
    minutes: number,
    hours: number,
    name: string,
    thread: number,
    repeats: boolean,
    scheduled: Schedule[]
}

export const createTimer = (seconds: number, minutes: number = 0,  hours: number = 0, name = "") : Timer => {
    const id = 'timer:' + Date.now();
    
    return {
        id,
        seconds,
        minutes,
        hours,
        name,
        thread: 0,
        repeats: false,
        scheduled: []
    }
}

export const getTotalSecondsForTimers = (timers: Timer[]) : number => {
    return timers.map(getTotalSeconds).reduce((a, b) => a + b, 0);
}

export const getTotalSeconds = (timer: Timer) : number => {
    return timer.seconds + (timer.minutes * 60) + (timer.hours * 60 * 60);
}

export const hourFromSeconds = (seconds: number) : number => {
    return Math.max(Math.floor(seconds / 60 / 60), 0);
}

export const minutesFromSeconds = (seconds: number) : number => {
    return Math.max(Math.floor(seconds / 60 / 60), 0);
}

export const getLabelFromSeconds = (time: number) : string => {
    const hours = Math.floor(time / 3600);
    const remainer = time - hours * 3600;

    const minutes = Math.floor(remainer / 60);
    const seconds = remainer - minutes * 60;

    return getLabelFromParts(seconds, minutes, hours);
}

export const getLabel = (timer: Timer) : string => {
    if (timer.name) {
        return timer.name;
    }
    
    return getLabelFromParts(timer.seconds, timer.minutes, timer.hours);
}

const getLabelFromParts = (seconds: number, minutes?: number, hours?: number): string => {
    const parts: string[] = [];

    if (hours) {
        parts.push(`${hours}h`);
    }
   
    if (minutes) {
        parts.push(`${minutes}m`);
    }

    parts.push(`${seconds}s`);

    return parts.join(' ');
}
