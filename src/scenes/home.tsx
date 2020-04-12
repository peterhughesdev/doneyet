import React, { useState } from 'react';
import { StyleSheet, Slider, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Icon, Button, Divider, Layout, Modal } from '@ui-kitten/components';

import { Notifications } from 'expo';
import * as Time from '../util/time';

export const HomeScreen = () => {
    const [timerLength, setTimerLength] = useState<number>(0);
    const [timerActive, setTimerActive] = useState<boolean>(false);
    const [timerID, setTimerID] = useState<number>(0);

    const startTimer = async () => {
        const seconds = Math.round(timerLength);

        const notification = {
            title: "Time's up!",
            body: `${seconds} seconds has elapsed`,
            ios: {
                sound: true,
                _displayInForeground: true
            }
        };

        
        Notifications.scheduleNotificationWithCalendarAsync(notification, {
            second: seconds,
            repeat: true
        });

        // Notifications.scheduleNotificationWithTimerAsync(notification, {
        //     interval: (seconds * 1000),
        //     repeat: true
        // });

        setTimerActive(true);
    }

    const stopTimer = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setTimerActive(false);
    }

    const seconds = Math.round(timerLength);

    return (
        <Layout style={styles.container}>

            <Text style={styles.text} category='h1'>
                Welcome to DoneYet
            </Text>

            <Layout  style={styles.modalContainer}>
                <Text style={styles.text} category='s1'>
                    Timer: {seconds} seconds
                </Text>

                <Divider />

                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={60}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={setTimerLength}
                />

                { timerActive ? 
                    (<Button style={styles.likeButton} appearance='filled' status='danger' onPress={stopTimer}>Stop timer</Button>) :
                    (<Button style={styles.likeButton} appearance='filled' status='info' onPress={startTimer}>Start timer</Button>)
                }
                
                <Divider />

                
            </Layout>
            
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 35
    },
    modalContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        width: 256,
        padding: 16,
        borderRadius: 4
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerControl: {
        marginHorizontal: 4
    },
    text: {
        textAlign: 'center',
    },
    likeButton: {
        marginVertical: 16,
    }
});