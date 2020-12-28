// Shamelessly stolen from 
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/#just-show-me-the-code
import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number| null) => {
    const savedCallback = useRef<Function>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}