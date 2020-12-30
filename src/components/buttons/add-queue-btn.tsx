import React from 'react';
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { addTimer } from '../../store/actions'
import { createTimer } from '../../util/timer';
import { ActionButton } from '../action-button';

interface AddQueueBtnProps {
    timer: number
}

export const AddQueueBtn = (props: AddQueueBtnProps) => {
    const timer = createTimer(props.timer);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const editTimer = () => {
        navigation.navigate('Timer', { timer });
    }

    const queueTimer = () => {
        dispatch(addTimer(timer));
    }

    return (
        <ActionButton onPress={queueTimer} onLongPress={editTimer} title='Queue' active={props.timer > 0} />
    )
}