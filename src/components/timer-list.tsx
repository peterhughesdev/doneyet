import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated from  'react-native-reanimated';
import SwipeableItem from 'react-native-swipeable-item';
import DraggableFlatList from "react-native-draggable-flatlist";

import { AntDesign } from '@expo/vector-icons';

import { Colours } from '../styles';
import { Timer } from '../util/timer';

import { TimerListItem } from './timer-list-item';

interface TimerListProp {
    timers: Timer[],
    scheduled: boolean,
    toggleRepeat: (timer: Timer) => void,
    onDragEnd: (timers: Timer[]) => void,
    deleteTimer: (timer: Timer) => void
}

export const TimerList = (props: TimerListProp) => {
    const renderUnderlayLeft = ({ item, percentOpen } : { item: any, percentOpen: any }) => (
        <Animated.View style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} >
          <TouchableOpacity onPressOut={() => props.deleteTimer(item.item)}>
              <AntDesign name='delete' style={styles.deleteIcon} />
          </TouchableOpacity>
        </Animated.View>
      );

    const renderOverlay = ({ item } : { item: { item: Timer, drag: () => void } }) => {
        return <TimerListItem timer={item.item} drag={item.drag} toggleRepeat={props.toggleRepeat} />  
    };

    const renderItem = ({ item, drag } : { item: Timer, drag: any }) => {
        const timerAndDrag = {
            item,
            drag
        };

        return (
            <SwipeableItem
                key={item.id}
                item={timerAndDrag}
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

const styles = StyleSheet.create({
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