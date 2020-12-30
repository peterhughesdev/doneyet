import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store';
import { scheduleTimers } from '../../store/actions'
import { ActionButton } from '../action-button';

export const StartQueueBtn = () => {
    const timers = useSelector((state: RootState) => state.queue.timers);
    const dispatch = useDispatch();

    const handleStart = () => {
        dispatch(scheduleTimers(timers));
    }

    return (
        <ActionButton onPress={handleStart} title='Start' active={timers.length > 0} />
    )
}