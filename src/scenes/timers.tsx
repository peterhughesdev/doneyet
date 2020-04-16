

import React, { useState } from 'react';

import { Text, Button, Divider, Layout, List, ListItem, Icon, Card, Spinner } from '@ui-kitten/components';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/app';
import colours from '../styles/colours.json';

import { scheduleNotification} from '../util/notifications';
import *  as Permissions from '../util/permissions';

import { Notifications } from 'expo';

import { Timer } from '../util/timer';

/* tslint:disable */
const JsListItem: any = ListItem;
const JsList: any = List;
/* tslint:enable */

import { useDispatch, useSelector } from 'react-redux'
import { clearQueue as emptyQueue, removeTimer, scheduleTimer, scheduleQueue } from '../store/actions'
import { RootState } from '../store';

export const TimersScreen = () => {
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

    const renderItemIcon = (item: Timer) => (
        <Layout style={[styles.row, { justifyContent: 'flex-end'}]}>
            {isScheduled ? 
            (<Spinner size="small" status='basic' />) :
            (<Text></Text>)
            }
            <AntDesign name='delete' style={styles.listButton} onPress={() => deleteTimer(item)} />
        </Layout>
    );

    const renderItem = ({ item, index } : { item: Timer, index: number }) => (
        <JsListItem
            style={styles.queueItem}
            textStyle={styles.queueItemText}
            title={`${item.seconds} seconds`}
            accessory={() => renderItemIcon(item)}
        />
    );
      
    return (
        <Layout style={styles.container}>
          
            <Layout style={styles.header}>
                <Text style={styles.title}>Timer queue</Text>
            </Layout>
            
            <Layout>
                <Button style={styles.background} textStyle={{color: colours.paleBright}} appearance='ghost' status='info' onPress={clearQueue}>Clear queue</Button>
            </Layout>

            <Layout style={styles.row}>
                <JsList
                    style={styles.queue}
                    data={timers}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                    />
            </Layout>
            
            <Layout style={[styles.row, { flex: 0.2 }]}>
                {isScheduled ? 
                (<Button style={styles.actionButton} appearance='filled' status='danger' onPress={stopTimers}>Stop timers</Button>) :
                (<Button style={[styles.startButton, styles.actionButton]} appearance='filled' status='info' onPress={startTimers}>Start timers</Button>)    
                }
            </Layout>
            
        </Layout>
    )
}