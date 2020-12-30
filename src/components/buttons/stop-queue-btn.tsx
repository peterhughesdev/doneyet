import React from 'react';
import { useDispatch } from 'react-redux'
import { stopTimers } from '../../store/actions'
import { ActionButton } from '../action-button';

export const StopQueueBtn = () => {
    const dispatch = useDispatch();

    const handleStop = () => {
        dispatch(stopTimers());
    }

    return (
        <ActionButton onPress={handleStop} title='Stop' />
    )
}