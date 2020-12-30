import React from  'react';
import { StyleSheet, TextInput } from 'react-native';
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
            borderColor: theme.backgroundTop
        }
    });

    return <TextInput value={value} onChangeText={onChange} style={themed.textInput} autoFocus={true} placeholder={'Custom label'} />
}   

const styles =  StyleSheet.create({
    textInput: {
        borderRadius: 4,
        borderWidth: 2,
        padding: 8,
        fontSize: 20
    }
})