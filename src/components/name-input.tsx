import React from  'react';
import { StyleSheet, TextInput } from 'react-native';
import { Layout, Typography } from '../styles';

import { useTheme } from '../util/theme';

type NameInputProps = {
    value: string,
    onChange: (value: string) => void
}

export const NameInput = ({ value, onChange } : NameInputProps) => {
    const theme = useTheme();

    const themed = StyleSheet.create({
        textInput: {
            ...styles.textInput,
            color: theme.textPrimary,
            backgroundColor: theme.backgroundDrawer
        }
    });

    return <TextInput value={value} onChangeText={onChange} style={themed.textInput} />
}   

const styles =  StyleSheet.create({
    textInput: {
        borderRadius: 4,
        padding: 8,
        fontSize: 20
    }
})