

import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { scheduleNotification} from '../util/notifications';

import { Notifications } from 'expo';

import { Timer } from '../util/timer';

import { useDispatch, useSelector } from 'react-redux'
import { clearQueue as emptyQueue, removeTimer, scheduleTimer, scheduleQueue } from '../store/actions'
import { RootState } from '../store';

import { Layout as Spacing, Colours } from '../styles';

import { BackgroundGradient } from '../components/background-gradient';

import { TimerList } from '../components/timer-list';
import { SceneTitle } from '../components/scene-title';

import { ActionButton } from '../components/action-button';
import { MutedButton } from '../components/muted-button';
import { StopButton } from '../components/stop-button';

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        ...Spacing.vertical,
        backgroundColor: Colours.background
    },
    buttons: {
        ...Spacing.row,
        flex: 0.2
    }
});

export const QueueScreen = () => {
    const scheduled = useSelector((state: RootState) => state.queue.scheduledDate);
    const timers = useSelector((state: RootState) => state.queue.timers);

    const isScheduled = scheduled > Date.now();

    const dispatch = useDispatch();

    const startTimers = async () => {
        let accumulated = 0;

        for (let i = 0; i < timers.length; ++i) {
            accumulated += timers[i].seconds;

            const id = await scheduleNotification(accumulated, false, "Time's up!", `${timers[i].seconds}s has elapsed`);

            dispatch(scheduleTimer(timers[i].id, id));
        }

        dispatch(scheduleQueue(accumulated));

        setTimeout(() => {
            dispatch(scheduleQueue(0));
        }, accumulated *  1000);
    }

    const stopTimers = () => {
        Notifications.cancelAllScheduledNotificationsAsync();
        dispatch(scheduleQueue(0));
    }

    const deleteTimer = async (timer: Timer) => {
        dispatch(removeTimer(timer.id));

        if (timer.scheduled) {
            try {
                await Notifications.cancelScheduledNotificationAsync(timer.scheduled);
            } catch (e) {
                // no-op
            }
        }
    }

    const clearQueue = () => {
        dispatch(emptyQueue());
        stopTimers();
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <SceneTitle title='Queue' />

            <MutedButton onPress={clearQueue} title='Clear queue' />
            
            <TimerList scheduled={isScheduled} timers={timers} deleteTimer={deleteTimer} />
            
            <View style={styles.buttons}>
                {isScheduled ? 
                (<StopButton onPress={stopTimers} title='Stop timers' />) :
                (<ActionButton onPress={startTimers} title='Start timers' />)    
                }
            </View>
        </View>
    )
}