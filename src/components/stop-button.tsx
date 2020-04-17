import React from 'react';

import { StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';

import { Colours, Typography, Buttons } from '../styles';

interface StopButtonProps {
    title: string,
    onPress: () => void
}

const styles = StyleSheet.create({
    active: {
        ...Buttons.action,
        backgroundColor: Colours.transparent,
        borderColor: Colours.transparent
    },
    text: {
        ...Typography.buttonText,
        color: Colours.text
    }
});

export const StopButton = (props: StopButtonProps) => {
    return (
        <Button style={styles.active} textStyle={styles.text} onPress={props.onPress}>{props.title}</Button>
    )
}