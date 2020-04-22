import React from 'react';
import { StyleSheet, Picker } from 'react-native';

import { Colours } from '../styles';

interface TimePickerProps {
    suffix: string,
    value: number,
    values: number[],
    onChange: (value: number) => void
}

const styles = StyleSheet.create({
    picker: {
        width: 150
    },
    item: {
        color: Colours.text
    }
});

export const TimePicker = (props: TimePickerProps) => {
    const options = props.values.map(option => {
        return <Picker.Item key={option} value={option} label={`${option}${props.suffix}`} />
    });

    return (
        <Picker
            style={styles.picker}
            itemStyle={styles.item}
            selectedValue={props.value}
            onValueChange={props.onChange}>
            {options}
        </Picker>
    )
}