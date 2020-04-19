import React from 'react';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from '@ui-kitten/components';

import { Colours, Typography, Buttons } from '../styles';

interface ActionButtonProps {
    title: string,
    onPress: () => void
}

const styles = StyleSheet.create({
    active: {
        ...Buttons.action,
        borderColor: Colours.transparent,
        height: 50,
        width: 100
    },
    text: {
        ...Typography.buttonText,
        color: Colours.text,
        padding: 15
    }
});

export const ActionButton = (props: ActionButtonProps) => {
    return (
        <TouchableOpacity style={styles.active} onPress={props.onPress}>
            <Text style={styles.text} >{props.title}</Text>
        </TouchableOpacity>
    )
}