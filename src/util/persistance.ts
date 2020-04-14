import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export function usePersistedState<T> (key: string, initial: T) : [T, (data: T) => void, () => void] {
    const [state, setState] = useState<T>(initial);

    function setPersistedState(value: T) {
        setState(value);

        AsyncStorage.setItem(key, JSON.stringify(value));
    }

    function clearPersistedState() {
        setState(initial);

        AsyncStorage.removeItem(key);
    }

    useEffect(() => {
        AsyncStorage.getItem(key).then(value => {
            return value === null ? initial : JSON.parse(value);
        }).then(value => {
            if (value != state) {
                setState(value);
            }
        });
    }, [key, initial]);
    
    return [state, setPersistedState, clearPersistedState];
} 
