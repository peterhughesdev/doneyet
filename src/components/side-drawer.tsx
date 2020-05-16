import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Typography, Layout, Colours } from '../styles';

import { Pallette } from './pallette';

export const SideDrawer = () => {

    const pallettes = [
        { title: "Default", colours: [Colours.paleWarm, Colours.accent, Colours.queue2, Colours.queue3] }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Themes</Text>

            {pallettes.map(pallette => (<Pallette title={pallette.title} colours={pallette.colours} /> ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Layout.fullHeight,
        backgroundColor: Colours.paleWarm,
        paddingTop: 100,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
    },
   
    title: {
        ...Typography.title
    }
});
