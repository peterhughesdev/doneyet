import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

import DropdownAlert from 'react-native-dropdownalert';

import { scheduleNotification, cancelAllNotifications } from '../util/notifications';

import { iterateIntervalSequence } from '../util/sequences';
import { createTimer } from '../util/timer';

import { Layout as Spacing, Colours } from '../styles';

import { useSelector, useDispatch } from 'react-redux'
import { addTimer, setTimer, startTimer as start, stopTimer as stop } from '../store/actions'
import { RootState } from '../store';

import { BackgroundGradient } from '../components/background-gradient';
import { ActionButton } from '../components/action-button';
import { StopButton } from '../components/stop-button';
import { SceneTitle } from '../components/scene-title';
import { TimePicker } from '../components/time-picker';
import { TimerModal } from '../components/timer-modal';

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        ...Spacing.vertical
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        backgroundColor: Colours.transparent
    },
});

const options = [
    { label: '20s', value: 20 },
    { label: '30s', value: 30 },
    { label: '45s', value: 45 },
    { label: '60s', value: 60 },
];

export const HomeScreen = () => {
    const running = useSelector((state: RootState) => state.front.running);
    const timer = useSelector((state: RootState) => state.front.timer);

    const dispatch = useDispatch();
   
    let dropdown: any;

    const setDropdown = (ref: any) => dropdown = ref;

    const queueTimer = () => {
        if (dropdown) {
            dropdown.alertWithType('info', 'Added to queue!', `Added a timer for ${timer.seconds}s to queue`);
        }

        dispatch(addTimer(createTimer(timer.seconds)));
    }

    const updateTimer = (seconds: number) => {
        dispatch(setTimer(createTimer(seconds)));
    }

    const startTimer = () => {
        const title = "Time's up!";
        const body = `${timer.seconds}s has elapsed`;

        iterateIntervalSequence(timer.seconds, (time, repeat) => {
            scheduleNotification(time, repeat, title, body);
        });

        dispatch(start());
    }

    const stopTimer = () => {
        cancelAllNotifications();

        dispatch(stop());
    }

    return (
        <View style={styles.container}>
            <BackgroundGradient />

            <SceneTitle title='Done Yet.' subtitle='Designed and built by Jasmine and Peter' />
            <TimePicker value={timer.seconds} values={options} onChange={updateTimer} />
            
            <View style={Spacing.row}>
                <ActionButton onPress={startTimer} title='Start' />
                <ActionButton onPress={queueTimer} title='Queue' />
            </View>

            <TimerModal title={`Sending alerts on a ${timer.seconds} second interval`} visible={running}>
                <View style={styles.spinner}>
                    <Spinner size="large" status='success' />
                </View>

                <StopButton onPress={stopTimer} title='Stop timer' /> 
            </TimerModal>

            <DropdownAlert ref={setDropdown} infoColor={Colours.background} />
        </View>
    );
};
