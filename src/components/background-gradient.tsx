import React from 'react';

import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Colours } from '../styles';

const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1000,
      }
});

export const BackgroundGradient = () => {
    return (
        <LinearGradient style={styles.fullScreen} colors={[Colours.paleWarm, Colours.background]} />
    )
}