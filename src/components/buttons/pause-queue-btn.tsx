import React from 'react';
import { useDispatch } from 'react-redux'
import { pauseTimers } from '../../store/actions'
import { ActionButton } from '../action-button';

export const PauseQueueBtn = () => {
    const dispatch = useDispatch();

    const handlePause = () => {
        dispatch(pauseTimers());
    }

    return (
        <ActionButton onPress={handlePause} title='Pause' />
    )
}