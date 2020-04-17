import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Colours, Typography } from '../styles';

interface SceneTitleProps {
    title: string,
    subtitle?: string
}

const styles = StyleSheet.create({
    title: {
        ...Typography.title,
        color: Colours.text,
    },
    subtitle: {
        ...Typography.subtitle,
        color: Colours.text
    },
    header: {
        marginTop: 50
    }
})

export const SceneTitle = (props: SceneTitleProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
        </View>
    )
}