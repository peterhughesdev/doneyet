
import React, { useEffect, useState } from 'react';

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSpring, animated } from 'react-spring/native'

import { Layout as Spacing, Colours, Typography } from '../styles';
import { getLabel, getLabelFromSeconds, Timer } from '../util/timer';
import { useTheme }  from '../util/theme';

import { Ionicons } from  '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { currentTimer } from '../util/scheduler';
import { useInterval } from '../util/interval';

interface TimerListItemProps {
    toggleRepeat: any;
    timer: Timer;
    drag: any;
}

const AnimatedView = animated(View);

export const TimerListItem = (props: TimerListItemProps) => {

    const schedule = useSelector((state: RootState) => state.schedule);
    const [isActive, setIsActive] = useState<boolean>(false);

    useInterval(() => {
        const active = currentTimer(schedule.timers, schedule.start, schedule.elapsed);
        setIsActive(active && active.id === props.timer.id);
    }, schedule.state === 'RUNNING' ? 1000 : null); 

    useEffect(() => {
        if (schedule.state === 'STOPPED') {
            setIsActive(false);
        }
    }, [schedule.state]);

    const slideFadeIn = useSpring({ opacity: 1, translateY: 0, from: { opacity: 0, translateY: 50 }, config: { tension: 100 }});
    const theme = useTheme();

    const label = getLabel(props.timer);
    const sublabel = props.timer.name ? getLabelFromSeconds(props.timer.time) : "";

    const toggleRepeat = () => props.toggleRepeat(props.timer);

    const animatedStyle = {
        ...styles.queueRow,
        opacity: slideFadeIn.opacity,
        transform: [{ 
            translateY: slideFadeIn.translateY
        }]
    };

    const themed = StyleSheet.create({
        queueItem: {
            ...styles.queueItem,
            backgroundColor: isActive ? theme.backgroundTop : theme.item
        },
        queueItemText: {
            ...styles.queueItemText,
            color: isActive ? theme.textPrimary : theme.textSecondary
        },
        repeatIconActive: {
            ...styles.repeatIconActive,
            color: theme.iconActive
        },
        repeatIcon: {
            ...styles.repeatIcon,
            color: theme.iconInactive
        }
    });

    const repeatIconStyle = props.timer.repeats ? themed.repeatIconActive : themed.repeatIcon;

    return (        
        <AnimatedView style={animatedStyle}>
            <TouchableOpacity style={themed.queueItem} onLongPress={props.drag}>
                <TouchableOpacity style={styles.queueItemIcon} onPressOut={toggleRepeat}>
                    <Ionicons name='ios-repeat' style={repeatIconStyle} />
                </TouchableOpacity>
                
                <Text style={themed.queueItemText}>{label}</Text>

                <View style={styles.queueItemIcon}>
                    <Text style={styles.queueItemSubtext}>{ sublabel }</Text>
                </View>
            </TouchableOpacity>
        </AnimatedView>  
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
        paddingHorizontal: 15,
        flex: 1
    },
    queueItemSubtext: {
        textAlign: 'center',
        width: 50
    },
    repeatIcon: {
        fontSize: 25
    },
    repeatIconActive: {
        fontSize: 25
    },
    queueItemText:  {
        ...Typography.lightFont,
        color: Colours.paleCool,
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 25,
        width: 140
    }
});