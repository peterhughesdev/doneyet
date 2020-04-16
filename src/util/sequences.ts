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

export const getRepeatingTimeoutsForInterval = (interval: number) : number[] => {
    const sequence = INTERVAL_SEQUENCES.get(interval);

    if (sequence) {
        return sequence.repeat;
    } else {
        return [];
    }
}

export const getTimeoutsForInterval = (interval: number) : number[] => {
    const sequence = INTERVAL_SEQUENCES.get(interval);

    if (sequence) {
        return sequence.once;
    } else {
        return [];
    }
}