import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Layout, Colours } from '../styles';

export const Pallette = ({ title, colours } : { title: string, colours: string[]}) => {
    return (
        <TouchableOpacity style={styles.pallette}>
            <View style={[styles.palletteBox, { backgroundColor: colours[0] }]}></View>
            <View style={[styles.palletteBox, { backgroundColor: colours[1] }]}></View>
            <View style={[styles.palletteBox, { backgroundColor: colours[2] }]}></View>
            <View style={[styles.palletteBox, { backgroundColor: colours[3] }]}></View>
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