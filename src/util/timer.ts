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

export const getTotalSeconds = (timer: Timer) : number => {
    return timer.seconds + (timer.minutes * 60) + (timer.hours * 60 * 60);
}

export const getLabel = (timer: Timer) : string => {
    const parts: string[] = [];

    if (timer.hours) {
        parts.push(`${timer.hours}h`);
    }
   
    if (timer.minutes) {
        parts.push(`${timer.minutes}m`);
    }

    parts.push(`${timer.seconds}s`);

    return parts.join(' ');
}
