export type Timer = {
    id: string,
    seconds: number,
    running: boolean,
    scheduled?: string
}

export const createTimer = (seconds: number) : Timer => {
    const id = 'timer:' + Date.now();

    return {
        id,
        seconds,
        running: false
    }
}
