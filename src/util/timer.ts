export interface Timer {
    id: string,
    time: number,
    name: string,
    thread: number,
    repeats: boolean
}

export const createTimer = (seconds: number, minutes: number = 0, hours: number = 0, name = "") : Timer => {
    const id = 'timer:' + Date.now();
    
    const time = seconds + (minutes * 60) + (hours *  60 * 60);

    return {
        id,
        time,
        name,
        thread: 0,
        repeats: false
    };
}

export const getTotalSecondsForTimers = (timers: Timer[]) : number => {
    return timers.map(timer => timer.time).reduce((a, b) => a + b, 0);
}

export const getLabel = (timer: Timer, defaultLabel?: string) : string => {
    if (timer.name) {
        return timer.name;
    }

    if (defaultLabel) {
        return defaultLabel;
    }
    
    return getLabelFromSeconds(timer.time);
}

export const getLabelFromSeconds = (time: number) : string => {
    const hours = Math.floor(time / 3600);
    const remainer = time - hours * 3600;

    const minutes = Math.floor(remainer / 60);
    const seconds = remainer - minutes * 60;

    return formatLabelParts(seconds, minutes, hours);
}

const formatLabelParts = (seconds: number, minutes?: number, hours?: number): string => {
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
