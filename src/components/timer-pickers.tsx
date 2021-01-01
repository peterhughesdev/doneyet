import React,  { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TimePicker } from './time-picker';
import { Layout as Spacing } from '../styles';
import { intervals } from '../util/scheduler';

interface TimerPickersProps {
    onChange: (value: number) => void
}

export const TimerPickers = (props: TimerPickersProps) => {
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const time = seconds + (minutes * 60) + (hours * 60  * 60);
        props.onChange(time);
    }, [hours, minutes, seconds]);

    return (
        <View style={styles.pickers}>
            <TimePicker value={hours} suffix='h' values={intervals.hours} onChange={setHours} />
            <TimePicker value={minutes} suffix='m' values={intervals.minutes} onChange={setMinutes} />
            <TimePicker value={seconds} suffix='s' values={intervals.seconds} onChange={setSeconds} />
        </View>
    )   
};

const styles = StyleSheet.create({
    pickers: {
        ...Spacing.row,
        marginBottom: 30
    }
});