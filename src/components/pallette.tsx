import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Layout, Colours } from '../styles';
import { Theme } from '../util/theme';

export const Pallette = ({ theme, onPress } : { theme: Theme, onPress: () => void}) => {
    return (
        <TouchableOpacity style={styles.pallette} onPress={onPress}>
            <View style={[styles.palletteBox, { backgroundColor: theme.backgroundCool }]}></View>
            <View style={[styles.palletteBox, { backgroundColor: theme.backgroundWarm }]}></View>
            <View style={[styles.palletteBox, { backgroundColor: theme.textPrimary }]}></View>
            <View style={[styles.palletteBox, { backgroundColor: theme.textSecondary }]}></View>
            <View style={[styles.palletteBox, { backgroundColor: theme.accent }]}></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pallette: {
        ...Layout.horizontal,
        marginVertical: 15,
        height: 40
    },
    palletteBox: {
        minWidth: 40,
        borderWidth: 1,
        borderColor: Colours.text
    }
});