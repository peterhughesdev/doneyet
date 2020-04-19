import React from 'react';

import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Colours, Layout } from '../styles';

const styles = StyleSheet.create({
    fullScreen: {
        ...Layout.fullHeight,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
      }
});

export const BackgroundGradient = () => {
    return (
        <LinearGradient style={styles.fullScreen} colors={[Colours.paleWarm, Colours.accent]} />
    )
}