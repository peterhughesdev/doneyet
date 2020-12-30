import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';

import { intervals } from '../util/scheduler';
import { createTimer, getLabelFromSeconds, getTotalSecondsForTimers, Timer } from '../util/timer';

import { Layout as Spacing, Colours } from '../styles';

import { useSelector, useDispatch } from 'react-redux'
import { toggleRepeat, addTimer, removeTimer, scheduleTimers, reorderQueue, stopTimers } from '../store/actions'
import { RootState } from '../store';

import { useTheme }  from '../util/theme';

import { BackgroundGradient } from '../components/background-gradient';
import { ActionButton } from '../components/action-button';
import { SceneTitle } from '../components/scene-title';
import { TimePicker } from '../components/time-picker';
import { TimerList } from '../components/timer-list';

import { Props } from '../navigations/props';
import { SectionTitle } from '../components/section-title';
import { useInterval } from '../util/interval';

export const HomeScreen = ({ navigation, route } : Props) => {
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

    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);

    const dispatch = useDispatch();
    const theme = useTheme();
   
    let dropdown: any;

    const setDropdown = (ref: any) => dropdown = ref;

    const timer = createTimer(seconds, minutes, hours);

    const reorderTimers = (timers: Timer[]) => {
        dispatch(reorderQueue(timers));
    }

    const editTimer = () => {
        navigation.navigate('Timer', { timer });
    }

    const queueTimer = () => {
        dispatch(addTimer(timer));
    }

    const deleteTimer = (timer: Timer) => {
        dispatch(removeTimer(timer.id));
    }

    const toggleTimerRepeat = (timer: Timer) => {
        dispatch(toggleRepeat(timer));
    }

    const handleStart = () => {
        setRemainingScheduledTime(totalQueuedTimeInSeconds);
        dispatch(scheduleTimers(timers));
    }

    const handleStop = () => {
        dispatch(stopTimers());
    }

    const popdownText = {
        color: theme.textSecondary 
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient />

            <SceneTitle title='Done Yet.' subtitle='Designed and built by Jasmine and Peter' />
            
            <View style={styles.pickers}>
                <TimePicker value={hours} suffix='h' values={intervals.hours} onChange={hours => setHours(hours)} />
                <TimePicker value={minutes} suffix='m' values={intervals.minutes} onChange={minutes => setMinutes(minutes)} />
                <TimePicker value={seconds} suffix='s' values={intervals.seconds} onChange={seconds => setSeconds(seconds)} />
            </View>

            <View style={styles.buttons}>
                {schedule.running ?
                    (<ActionButton onPress={handleStop} title='Stop' /> ) :
                    (<ActionButton onPress={handleStart} title='Start' active={timers.length > 0} />)
                }
                
                <ActionButton onPress={queueTimer} onLongPress={editTimer} title='Queue' active={seconds + minutes + hours > 0} />
            </View>

            <View style={styles.queue}>
                <TimerList scheduled={false} timers={timers} deleteTimer={deleteTimer} toggleRepeat={toggleTimerRepeat} onDragEnd={reorderTimers} />
                {schedule.running ?
                    (<SectionTitle title={totalScheduledTimeLabel} />) : 
                    (<SectionTitle title={totalQueuedTimeLabel} />)
                }
            </View>

            <DropdownAlert ref={setDropdown} translucent={true} infoColor={theme.backgroundBottom} titleStyle={popdownText}  messageStyle={popdownText} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Spacing.vertical,
        paddingTop: 35,
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        backgroundColor: Colours.transparent
    },
    pickers: {
        ...Spacing.row,
        marginBottom: 30,
    },
    buttons: {
        ...Spacing.row,
        justifyContent: 'space-between',
        marginTop: 160,
    },
    queue: {
        ...Spacing.fullWidth,
        alignItems: 'center',
        marginTop: 100,
        height: 400
    }
});