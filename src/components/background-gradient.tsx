import React from 'react';

import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Layout } from '../styles';
import { useTheme  } from '../util/theme';

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
    const theme = useTheme();

    return (
        <LinearGradient style={styles.fullScreen} colors={[theme.backgroundTop, theme.backgroundBottom]} />
    )
}