import React, { useState, useEffect } from 'react';
import { View, Picker } from 'react-native';
import { Text, Button, Layout, Modal, Card, Spinner } from '@ui-kitten/components';

import DropdownAlert from 'react-native-dropdownalert';

import { scheduleNotification, cancelAllNotifications } from '../util/notifications';

import { getTimeoutsForInterval, getRepeatingTimeoutsForInterval } from '../util/sequences';
import { createTimer, Timer } from '../util/timer';

import { styles } from '../styles/app';
import colours from '../styles/colours.json';

import { useSelector, useDispatch } from 'react-redux'
import { addTimer, setTimer, startTimer as start, stopTimer as stop } from '../store/actions'
import { RootState } from '../store';

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

        getTimeoutsForInterval(timer.seconds).forEach(time => {
            scheduleNotification(time, false, title, body);
        });

        getRepeatingTimeoutsForInterval(timer.seconds).forEach(time => {
            scheduleNotification(time, true, title, body);
        });

        dispatch(start());
    }

    const stopTimer = () => {
        cancelAllNotifications();

        dispatch(stop());
    }

    const Header = () => (
        <View>
          <Text category='h5'>Timer started</Text>
        </View>
    );

    return (
        <Layout style={[styles.container, styles.background]}>
            <Layout style={styles.header}>
                <Text style={styles.title}>Done Yet?</Text>
                <Text style={styles.subtitle}>Designed by Peter, made for Jasmine</Text>
            </Layout>

            <Layout style={styles.row}>

                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={timer.seconds}
                    onValueChange={updateTimer}>
                        <Picker.Item label="5s" value={5} />
                        <Picker.Item label="20s" value={20} />
                        <Picker.Item label="30s" value={30} />
                        <Picker.Item label="45s" value={45} />
                        <Picker.Item label="60s" value={60} />
                </Picker>

            
                <Modal 
                    visible={running}
                    backdropStyle={styles.backdrop}>

                    <Card style={styles.card} disabled={true} status='success' header={Header}>
                        <Text>{`Sending alerts on a ${timer.seconds} second interval`}</Text>
                        <Layout style={styles.spinner}>
                            <Spinner size="large" status='success'/>
                        </Layout>

                        <Button appearance='filled' status='danger' onPress={stopTimer}>Stop timer</Button>
                    </Card>
                </Modal>
            </Layout>

            <Layout style={styles.row}>
                { running ? 
                    (<Text></Text>) :
                    (<Button style={styles.startButton} appearance='filled' status='info' onPress={startTimer}>Start timer</Button>)
                }

                <Button style={styles.queueButton} textStyle={{color: colours.paleBright}} appearance='outline' onPress={queueTimer}>Add to queue</Button>
            </Layout>

            <DropdownAlert ref={setDropdown} infoColor={colours.active} />
        </Layout>
    );
};
