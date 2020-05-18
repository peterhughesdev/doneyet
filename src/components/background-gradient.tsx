import React from 'react';

import { StyleSheet } from 'react-native';
import { useSelector } from  'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import { RootState }  from '../store';
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
    const theme = useSelector((state: RootState) => state.theme.active);

    return (
        <LinearGradient style={styles.fullScreen} colors={[theme.backgroundTop, theme.backgroundBottom]} />
    )
}