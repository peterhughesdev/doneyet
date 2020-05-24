import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Layout } from '../styles';
import { setTheme } from '../store/actions';
import { RootState } from '../store';

import { Pallette } from './pallette';

import { useTheme, Theme, Default, Alt1 } from '../util/theme';

export const SideDrawer = ({ navigation } : { navigation:  any}) => {
    const themes = [Default, Alt1];
    
    const theme = useTheme();

    const dispatch = useDispatch();

    const selectTheme = (theme: Theme) => {
        dispatch(setTheme(theme));
        navigation.closeDrawer();
    }

    const styles = StyleSheet.create({
        container: {
            ...Layout.fullHeight,
            backgroundColor: theme.backgroundDrawer,
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Themes</Text>
            {themes.map(theme => (<Pallette key={theme.name} theme={theme} onPress={() => selectTheme(theme)} /> ))}
        </View>
    );
}
