

import React, { useState } from 'react';

import { Text, Button, Divider, Layout, List, ListItem, Icon, Card, Spinner } from '@ui-kitten/components';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/app';
import colour from '../styles/colours.json';

import { scheduleNotification} from '../util/notifications';
import *  as Permissions from '../util/permissions';

import  { usePersistedState } from '../util/persistance';
import { Notifications } from 'expo';

import { Timer } from '../util/timer';

/* tslint:disable */
const JsListItem: any = ListItem;
const JsList: any = List;
/* tslint:enable */


export const TimersScreen = () => {
    const [isScheduled, setScheduled] = usePersistedState<boolean>("scheduled", false);
    const [timers, setTimers] = usePersistedState<Timer[]>("timers", []);

    const startTimers = async () => {
        Permissions.registerForUserFacingNotificationsAsync();

        let accumulated = 0;

        for (let i = 0; i < timers.length; ++i) {
            accumulated += timers[i].seconds;

            const id = await scheduleNotification(accumulated, false, "Time's up!", `${timers[i].seconds}s has elapsed`);

            timers[i].scheduled = id;
        }

        setScheduled(true);
        setTimers(timers);

        setTimeout(() => {
            setScheduled(false);
        }, accumulated *  1000);
    }

    const stopTimers = () => {
        Notifications.cancelAllScheduledNotificationsAsync();
        setScheduled(false);
    }

    const deleteTimer = async (timer: Timer) => {
        const proxy = timers.concat([]);
        const idx = proxy.findIndex(item => item.id === timer.id);
        
        proxy.splice(idx, 1);

        if (timer.scheduled) {
            try {
                await Notifications.cancelScheduledNotificationAsync(timer.scheduled);
            } catch (e) {
                // no-op
            }
        }

        setTimers(proxy);
    }

    const clearQueue = () => {
        stopTimers();
        setTimers([]);
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
          title={`${item.seconds} seconds`}
          accessory={() => renderItemIcon(item)}
          keyExtractor={(item: Timer) => item.id}
        />
    );
      
    return (
        <Layout style={styles.container}>
          
            <Layout style={styles.header}>
                <Text style={styles.title}>Timer queue</Text>
            </Layout>
            
            <Layout>
                <Button textStyle={styles.buttonText} appearance='ghost' status='info' onPress={clearQueue}>Clear queue</Button>
            </Layout>

            <Layout style={styles.row}>
                <JsList
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