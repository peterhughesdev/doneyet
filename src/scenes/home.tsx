import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { getLabelFromSeconds, getTotalSecondsForTimers, Timer } from '../util/timer';

import { Layout as Spacing } from '../styles';

import { useSelector, useDispatch } from 'react-redux'
import { toggleRepeat, removeTimer, reorderQueue, stopTimers } from '../store/actions'
import { RootState } from '../store';

import { BackgroundGradient } from '../components/background-gradient';
import { SceneTitle } from '../components/scene-title';
import { TimerList } from '../components/timer-list';

import { SectionTitle } from '../components/section-title';
import { useInterval } from '../util/interval';
import { StopQueueBtn } from '../components/buttons/stop-queue-btn';
import { StartQueueBtn } from '../components/buttons/start-queue-btn';
import { TimerPickers } from '../components/timer-pickers';
import { AddQueueBtn } from '../components/buttons/add-queue-btn';
import { PauseQueueBtn } from '../components/buttons/pause-queue-btn';
import { useSpring, animated } from 'react-spring/native';

const AnimatedView = animated(View);

export const HomeScreen = () => {
    const timers = useSelector((state: RootState) => state.queue.timers);
    const schedule = useSelector((state: RootState) => state.schedule);

    const totalScheduledTime = getTotalSecondsForTimers(schedule.timers);
    const totalQueuedTimeInSeconds = getTotalSecondsForTimers(timers);

    const [remainingScheduledTime, setRemainingScheduledTime] = useState<number>(totalScheduledTime);

    const totalScheduledTimeLabel = getLabelFromSeconds(remainingScheduledTime);
    const totalQueuedTimeLabel = getLabelFromSeconds(totalQueuedTimeInSeconds);

    useInterval(() => {
        const elapsed = Math.floor((Date.now() - schedule.start) / 1000);
        const remaining = Math.max(totalScheduledTime - elapsed, 0);

        setRemainingScheduledTime(remaining);

        if (remaining <= 0) {
            dispatch(stopTimers());
        }
    }, schedule.running ? 1000 : null);

    const [pendingTimer, setPendingTimer] = useState<number>(0);
    
    const dispatch = useDispatch();

    const reorderTimers = (timers: Timer[]) => {
        dispatch(reorderQueue(timers));
    }

    const deleteTimer = (timer: Timer) => {
        dispatch(removeTimer(timer.id));
    }

    const toggleTimerRepeat = (timer: Timer) => {
        dispatch(toggleRepeat(timer));
    }

    const [pickerProps, setPickerProps] = useSpring(() => ({
        opacity: 1,
        height: 140
    }));

    useEffect(() => {
        if (schedule.running) {
            setPickerProps({
                opacity: 0,
                height: 0
            });
        } else {
            setPickerProps({
                opacity: 1,
                height: 140
            });
        }
    }, [schedule.running]);

    return (
        <View style={styles.container}>
            <BackgroundGradient />

            <SceneTitle title='Done Yet.' subtitle='Designed and built by Jasmine and Peter' />
            
            <AnimatedView style={[styles.pickers, pickerProps]}>
                <TimerPickers onChange={setPendingTimer} />
            </AnimatedView>

            <View style={styles.buttons}>
                {schedule.running ?
                    (<PauseQueueBtn />) :
                    (<StartQueueBtn />)
                }

                {schedule.running ?
                    (<StopQueueBtn />) :
                    (<AddQueueBtn timer={pendingTimer} />)
                }
            </View>

            <View style={styles.queue}>
                <TimerList scheduled={false} timers={timers} deleteTimer={deleteTimer} toggleRepeat={toggleTimerRepeat} onDragEnd={reorderTimers} />
                {schedule.running ?
                    (<SectionTitle title={totalScheduledTimeLabel} />) : 
                    (<SectionTitle title={totalQueuedTimeLabel} />)
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Spacing.vertical,
        paddingTop: 35,
    },
    pickers: {
        
    },
    buttons: {
        ...Spacing.row,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    queue: {
        ...Spacing.fullWidth,
        alignItems: 'center',
        marginTop: 100,
        height: 400
    },
    modal: {
        height: 350,
        width: 400, 
        backgroundColor: 'white',
        borderRadius: 10,
        shadowRadius: 19,
        shadowColor: 'rgba(0,0,0, 0.9)',
        alignSelf: 'center',
        justifyContent: "space-between"
    },
});