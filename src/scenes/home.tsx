import React, { useState, useEffect, useRef } from 'react';
import { View, Picker } from 'react-native';
import { Text, Button, Divider, Layout, Modal, Card, Spinner } from '@ui-kitten/components';

import DropdownAlert from 'react-native-dropdownalert';
import { SafeAreaLayout } from '../components/safe-area-layout';
import { LinearGradient } from 'expo-linear-gradient';

import { Notifications } from 'expo';
import { scheduleNotification} from '../util/notifications';
import *  as Permissions from '../util/permissions';

import { getTimeoutsForInterval, getRepeatingTimeoutsForInterval } from '../util/sequences';
import { usePersistedState } from '../util/persistance';
import { createTimer, Timer } from '../util/timer';

import { styles } from '../styles/app';
import colours from '../styles/colours.json';

export const HomeScreen = () => {
    const [timers, setTimers] = usePersistedState<Timer[]>("timers", []);
    const [timer, setTimer] = useState<Timer>(createTimer(20));

    useEffect(()  => {
        if (timer.running) {
            (async () => {
                await Permissions.registerForUserFacingNotificationsAsync();

                const title = "Time's up!";
                const body = `${timer.seconds}s has elapsed`;
        
                getTimeoutsForInterval(timer.seconds).forEach(time => {
                    scheduleNotification(time, false, title, body);
                });
        
                getRepeatingTimeoutsForInterval(timer.seconds).forEach(time => {
                    scheduleNotification(time, true, title, body);
                });
            })();
        } else {
            Notifications.cancelAllScheduledNotificationsAsync();
        }
    }, [timer]);

    let dropdown: any;

    const setDropdown = (ref: any) => dropdown = ref;

    const queueTimer = () => {
        if (dropdown) {
            dropdown.alertWithType('info', 'Added to queue!', `Added a timer for ${timer.seconds}s to queue`);
        }

        setTimers(timers.concat(timer));
        setTimer(createTimer(timer.seconds));
    }

    const updateTimer = (seconds: number) => {
        setTimer({...timer, seconds: seconds});
    }

    const startTimer = () => {
        setTimer({...timer, running: true});
    }

    const stopTimer = () => {
        setTimer({...timer, running: false});
    }

    const Header = () => (
        <View>
          <Text category='h5'>Timer started</Text>
        </View>
    );

    return (
        <Layout style={styles.container}>
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
                        <Picker.Item label="40s" value={40} />
                        <Picker.Item label="60s" value={60} />
                </Picker>

            
                <Modal 
                    visible={timer.running}
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
                { timer.running ? 
                    (<Text></Text>) :
                    (<Button style={styles.startButton} appearance='filled' status='info' onPress={startTimer}>Start timer</Button>)
                }

                <Button style={styles.queueButton} textStyle={{color: colours.paleBright}} appearance='outline' onPress={queueTimer}>Add to queue</Button>
            </Layout>

            <DropdownAlert ref={setDropdown} infoColor={colours.active} />
        </Layout>
    );
};