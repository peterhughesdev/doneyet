import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Picker, StatusBar } from 'react-native';
import { Text, Icon, Button, Divider, Layout, Modal, Card, Spinner } from '@ui-kitten/components';

import { Notifications } from 'expo';
import { scheduleNotification} from '../util/notifications';
import *  as Permissions from '../util/permissions';
  

const NULL_REG = {
    remove: () => {}
};

type Registration = {
    remove: Function
}

type IntervalSequence = {
    once: number[],
    repeat: number[]
}

const INTERVAL_SEQUENCES = new Map<number, IntervalSequence>();

INTERVAL_SEQUENCES.set(5, {
    once: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    repeat: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115]
});

INTERVAL_SEQUENCES.set(20, {
    once: [20, 40],
    repeat: [60, 80, 100]
});

INTERVAL_SEQUENCES.set(30, {
    once: [30],
    repeat: [60, 90]
});

INTERVAL_SEQUENCES.set(40, {
    once: [40],
    repeat: [80, 120]
});

export const HomeScreen = () => {
    const [seconds, setSeconds] = useState<number>(20);
    const [timerActive, setTimerActive] = useState<boolean>(false);

    const startTimer = async () => {
        Permissions.registerForUserFacingNotificationsAsync();
        Permissions.registerForPushNotificationsAsync();

        const intervals: IntervalSequence | undefined = INTERVAL_SEQUENCES.get(seconds);

        const title = "Time's up!";
        const body = `${seconds} has elapsed`;

        intervals!.once.forEach(time => {
            scheduleNotification(time, false, title, body);
        });

        intervals!.repeat.forEach(time => {
            scheduleNotification(time, true, title, body);
        });

        setTimerActive(true);
    }

    const stopTimer = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();

        setTimerActive(false);
    }

    const Header = () => (
        <View>
          <Text category='h5'>Timer started</Text>
        </View>
    );

    return (
        <Layout style={styles.container}>
            <Layout style={styles.header}>
                <Text style={styles.text} category='h1'>Done Yet?</Text>
                <Text>Designed by Peter, made for Jasmine</Text>
            </Layout>

            <Layout style={styles.layout}>

                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={seconds}
                    onValueChange={(value) => setSeconds(value)}>
                        <Picker.Item label="5s" value={5} />
                        <Picker.Item label="20s" value={20} />
                        <Picker.Item label="30s" value={30} />
                        <Picker.Item label="40s" value={40} />
                </Picker>

            
                <Modal 
                    visible={timerActive}
                    backdropStyle={styles.backdrop}>

                    <Card style={styles.card} disabled={true} status='success' header={Header}>
                        <Text>{`Sending alerts on a ${seconds} second interval`}</Text>
                        <Layout style={styles.spinner}>
                            <Spinner size="large" status='success'/>
                        </Layout>
                        <Button style={styles.likeButton} appearance='filled' status='danger' onPress={stopTimer}>Stop timer</Button>
                    </Card>
                </Modal>
            </Layout>

            <Layout style={styles.layout}>
                { timerActive ? 
                    (<Text></Text>) :
                    (<Button style={styles.likeButton} appearance='filled' status='info' onPress={startTimer}>Start timer</Button>)
                }
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 35
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 50
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    picker: {
        height: 50, 
        width: 150
    },
    pickerItem: {
        color: 'white'
    },
    card: {
        flex: 1,
        margin: 2,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
    likeButton: {
        marginVertical: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});