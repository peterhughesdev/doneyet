
import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSpring, animated } from 'react-spring/native'

import { Layout as Spacing, Colours, Typography } from '../styles';
import { getLabel, Timer } from '../util/timer';

import { Ionicons } from  '@expo/vector-icons';

interface TimerListItemProps {
    toggleRepeat: any,
    timer: any,
    drag: any
}

const AnimatedView = animated(View);

export const TimerListItem = (props: TimerListItemProps) => {
    const slideFadeIn = useSpring({ opacity: 1, translateY: 0, from: { opacity: 0, translateY: 50 }, config: { tension: 100 }});

    const label = getLabel(props.timer);

    const repeatIconStyle = props.timer.repeats ? styles.repeatIconActive : styles.repeatIcon;
    const toggleRepeat = () => props.toggleRepeat(props.timer);

    const animatedStyle = {
        opacity: slideFadeIn.opacity,
        transform: [{ 
            translateY: slideFadeIn.translateY
        }]
    };

    return (        
            <View style={styles.queueRow}>
                <AnimatedView style={animatedStyle}>

                <TouchableOpacity style={styles.queueItem} onLongPress={props.drag}>
                    <TouchableOpacity style={styles.queueItemIcon} onPressOut={toggleRepeat}>
                        <Ionicons name='ios-repeat' style={repeatIconStyle} />
                    </TouchableOpacity>
                    
                    <Text style={styles.queueItemText}>{label}</Text>

                    <View style={styles.queueItemIcon}>
                        
                    </View>
                </TouchableOpacity>

                </AnimatedView>
            </View>
    );
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