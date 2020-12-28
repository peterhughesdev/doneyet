import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Colours, Typography } from '../styles';

interface SectionTitleProps {
    title: string
}

const styles = StyleSheet.create({
    subtitle: {
        ...Typography.subtitle,
        color: Colours.text
    },
    header: {
        marginTop: 50
    }
})

export const SectionTitle = (props: SectionTitleProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.subtitle}>{props.title}</Text>
        </View>
    )
}