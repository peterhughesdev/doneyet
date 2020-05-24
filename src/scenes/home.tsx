import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DropdownAlert from 'react-native-dropdownalert';

import { intervals, scheduleTimers, unscheduleTimer, unscheduleTimers, hasRunningTimers } from '../util/scheduler';
import { createTimer, getLabel, Timer } from '../util/timer';

import { Layout as Spacing, Colours } from '../styles';

import { useSelector, useDispatch } from 'react-redux'
import { toggleRepeat, addTimer, removeTimer, scheduleTimer, reorderQueue } from '../store/actions'
import { RootState } from '../store';

import { useTheme }  from '../util/theme';

import { BackgroundGradient } from '../components/background-gradient';
import { ActionButton } from '../components/action-button';
import { SceneTitle } from '../components/scene-title';
import { TimePicker } from '../components/time-picker';
import { TimerList } from '../components/timer-list';

export const HomeScreen = () => {
    const timers = useSelector((state: RootState) => state.queue.timers);

    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);

    const dispatch = useDispatch();
    const theme = useTheme();
   
    let dropdown: any;

    const setDropdown = (ref: any) => dropdown = ref;

    const timersRunning = hasRunningTimers(timers);

    const timer = createTimer(seconds, minutes, hours);
    const label = getLabel(timer);

    const reorderTimers = (timers: Timer[]) => {
        dispatch(reorderQueue(timers));
    }

    const queueTimer = () => {
        if (dropdown) {
            dropdown.alertWithType('info', 'Queued!', `Added a timer for ${label} to queue`);
        }

        dispatch(addTimer(timer));
    }

    const handleStart = () => {
        scheduleTimers(timers, (timer, id) => {
            dispatch(scheduleTimer(timer.id, id));
        });
    }

    const handleStop = () => {
        const unscheduled = unscheduleTimers(timers);
        dispatch(reorderQueue(unscheduled));
    }

    const deleteTimer = (timer: Timer) => {
        unscheduleTimer(timer);
        dispatch(removeTimer(timer.id));
    }

    const toggleTimerRepeat = (timer: Timer) => {
        dispatch(toggleRepeat(timer));
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
                {timersRunning ?
                    (<ActionButton onPress={handleStop} title='Stop' /> ) :
                    (<ActionButton onPress={handleStart} title='Start' active={timers.length > 0} />)
                }
                
                <ActionButton onPress={queueTimer} title='Queue' active={seconds + minutes + hours > 0} />
            </View>

            <View style={styles.queue}>
                <TimerList scheduled={false} timers={timers} deleteTimer={deleteTimer} toggleRepeat={toggleTimerRepeat} onDragEnd={reorderTimers} />
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