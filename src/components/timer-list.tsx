import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Layout, Divider, List, ListItem, Spinner } from '@ui-kitten/components';
import { AntDesign } from '@expo/vector-icons';

import { Layout as Spacing, Colours, Typography } from '../styles';
import { Timer } from '../util/timer';

interface TimerListProp {
    timers: Timer[],
    scheduled: boolean,
    deleteTimer: (timer: Timer) => void
}

const styles = StyleSheet.create({
    queue: {
        width: 300,
        backgroundColor: Colours.transparent,
        overflow: 'visible'
    },
    queueItem:  {
        marginBottom: 15,
        borderRadius: 12,
        backgroundColor: Colours.background,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,      
        },
        shadowOpacity: 0.07,
        shadowRadius: 20,
    },
    queueItemText:  {
        ...Typography.lightFont,
        color: Colours.paleCool,
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 25,
    },
    queueIconLayout: {
        ...Spacing.row,
        justifyContent: 'flex-end',
        backgroundColor: Colours.transparent
    },
    deleteIcon: {
        color: Colours.text
    }
});

const colours = [Colours.queue2, Colours.queue3, Colours.queue4];

export const TimerList = (props: TimerListProp) => {

    const renderItemIcon = (item: Timer) => (
        <Layout style={styles.queueIconLayout}>
            {props.scheduled ? 
            (<Spinner size="small" status='basic' />) :
            (<Text></Text>)
            }
            <AntDesign name='delete' style={styles.deleteIcon} onPress={() => props.deleteTimer(item)} />
        </Layout>
    );
    
    const renderItem = ({ item, index } : { item: Timer, index: number }) => {
        const bg = colours[index % colours.length];

        return (
            <View style={[styles.queueItem, { backgroundColor: bg }]}>
                <Text style={styles.queueItemText}>{item.seconds} seconds</Text>
            </View>
        );
    }

    return (
        <List
            style={styles.queue}
            data={props.timers}
            renderItem={renderItem}
        />
    )
}