
import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useSpring, animated } from 'react-spring/native'

import { Layout as Spacing, Colours, Typography } from '../styles';
import { getLabel } from '../util/timer';
import { useTheme }  from '../util/theme';

import { Ionicons } from  '@expo/vector-icons';

interface TimerListItemProps {
    toggleRepeat: any,
    timer: any,
    drag: any
}

const AnimatedView = animated(View);

export const TimerListItem = (props: TimerListItemProps) => {
    const slideFadeIn = useSpring({ opacity: 1, translateY: 0, from: { opacity: 0, translateY: 50 }, config: { tension: 100 }});
    const theme = useTheme();

    const label = getLabel(props.timer);

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
            backgroundColor: theme.item
        },
        queueItemText: {
            ...styles.queueItemText,
            color: theme.textSecondary
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
        flex: 1
    },
    repeatIcon: {
        paddingHorizontal: 15,
        fontSize: 25
    },
    repeatIconActive: {
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
    }
});