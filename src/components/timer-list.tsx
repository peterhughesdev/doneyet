import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import Animated from  'react-native-reanimated';
import SwipeableItem from 'react-native-swipeable-item';
import DraggableFlatList from "react-native-draggable-flatlist";

import {  AntDesign } from '@expo/vector-icons';

import { Layout as Spacing, Colours, Typography } from '../styles';
import { getLabel, Timer } from '../util/timer';

import { Ionicons } from  '@expo/vector-icons';

interface TimerListProp {
    timers: Timer[],
    scheduled: boolean,
    toggleRepeat: (timer: Timer) => void,
    onDragEnd: (timers: Timer[]) => void,
    deleteTimer: (timer: Timer) => void
}

const styles = StyleSheet.create({
    queueRow: {
        ...Spacing.fullWidth,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    queueItem:  {
        backgroundColor: Colours.accent,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        marginVertical: 8,
        borderRadius: 12,
        opacity: 0.7,
        width: 300,
    },
    queueItemIcon: {
        justifyContent: 'center',
        flex: 1
    },
    repeatIcon: {
        color: Colours.modalBackdrop,
        paddingHorizontal: 15,
        fontSize: 25
    },
    repeatIconActive: {
        color: Colours.paleBright,
        paddingHorizontal: 15,
        fontSize: 25
    },
    queueItemText:  {
        ...Typography.lightFont,
        color: Colours.paleCool,
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 25,
        width: 140
    },
    queueIconLayout: {
        ...Spacing.row,
        justifyContent: 'flex-end',
        backgroundColor: Colours.transparent
    },
    deleteIcon: {
        color: Colours.paleBright,
        fontWeight: "bold",
        fontSize: 32
    },
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 15
    },
    underlayRight: {
        flex: 1,
        backgroundColor: "teal",
        justifyContent: "flex-start"
    },
    underlayLeft: {
        flex: 1,
        backgroundColor: "tomato",
        justifyContent: "flex-end"
    }
});

export const TimerList = (props: TimerListProp) => {

    const renderUnderlayLeft = ({ item, percentOpen } : { item : { item: Timer }, percentOpen: number }) => (
        <Animated.View
          style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} >
          <TouchableOpacity onPressOut={() => props.deleteTimer(item.item)}>
              <AntDesign name='delete' style={styles.deleteIcon} />
          </TouchableOpacity>
        </Animated.View>
      );

    const renderOverlay = ({ item, openLeft, openRight, openDirection, close }) => {
        const timer: Timer = item.item;
        const label = getLabel(timer);

        const repeatIconStyle = timer.repeats ? styles.repeatIconActive : styles.repeatIcon;
        const toggleRepeat = () => props.toggleRepeat(timer);

        return (
            <View style={styles.queueRow}>
                <TouchableOpacity style={styles.queueItem} onLongPress={item.drag}>
                    <TouchableOpacity style={styles.queueItemIcon} onPressOut={toggleRepeat}>
                        <Ionicons name='ios-repeat' style={repeatIconStyle} />
                    </TouchableOpacity>
                    
                    <Text style={styles.queueItemText}>{label}</Text>

                    <View style={styles.queueItemIcon}>
                        
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const renderItem = ({ item, index, drag } : { item: Timer, index?: any, drag: any }) => {
        return (
            <SwipeableItem
                key={item.id}
                item={{ item, drag }}
                overSwipe={50}
                snapPointsLeft={[100]}
                renderOverlay={renderOverlay}
                renderUnderlayLeft={renderUnderlayLeft}
            />
        );
    }

    return (
        <DraggableFlatList
            activationDistance={15}
            keyExtractor={item => item.id}
            data={props.timers}
            renderItem={renderItem}
            onDragEnd={({ data }) => { props.onDragEnd(data); }} />
    )
}