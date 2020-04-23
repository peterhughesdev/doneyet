import React from 'react';

import { useSpring, animated } from 'react-spring/native'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Colours, Typography, Buttons } from '../styles';

interface ActionButtonProps {
    title: string,
    active: boolean,
    onPress: () => void
}

const AnimatedText = animated(Text);

export const ActionButton = (props: ActionButtonProps) => {
    const activeToggle = useSpring({opacity: props.active ? 1 : 0.4})

    return (
        <TouchableOpacity style={styles.active} onPress={props.onPress} disabled={!props.active}>
            <AnimatedText style={[styles.text, activeToggle]}>{props.title}</AnimatedText>
        </TouchableOpacity>
    )
}

ActionButton.defaultProps = {
    active: true
};

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