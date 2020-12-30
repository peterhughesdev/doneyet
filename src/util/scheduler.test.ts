import { schedule } from './scheduler';
import { createTimer, getTotalSeconds } from './timer';

describe("scheduler", () => {
    const timer1 = createTimer(1, 2, 3, "timer-1");
    const timer2 = createTimer(4, 5, 6, "timer-2");
    const timer3 = createTimer(7, 8, 9, "timer-3");

    const currentTime = Date.now();

    it('can schedule a single timer', () => {
        const r = schedule([timer1]);
        
        expect(r).toEqual({
            start: expect.any(Number),
            timers: [
                getTotalSeconds(timer1)
            ]
        });

        expect(r.start).toBeGreaterThanOrEqual(currentTime);
    });

    it('can schedule multiple timers', () => {
        const r = schedule([timer1, timer2, timer3]);
        
        expect(r).toEqual({
            start: expect.any(Number),
            timers: [
                getTotalSeconds(timer1),
                getTotalSeconds(timer2),
                getTotalSeconds(timer3)
            ]
        });

        expect(r.start).toBeGreaterThanOrEqual(currentTime);
    });
});