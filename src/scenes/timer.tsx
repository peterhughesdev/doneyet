import React, { useState } from 'react';

import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import  { useDispatch } from 'react-redux';

import { addTimer } from '../store/actions';

import { NameInput } from '../components/name-input';
import { SceneTitle } from '../components/scene-title';
import { ActionButton } from '../components/action-button';

import { Props } from '../navigations/props';

import { useTheme } from '../util/theme';
import { getLabel } from '../util/timer';

import { Layout, Typography } from '../styles';

export const TimerScreen = ({ navigation, route } : Props) => {
    const timer = route.params?.timer;
    const label = getLabel(timer);
    
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const theme = useTheme();

    const confirm = () => {
        if (timer) {
            dispatch(addTimer({
                ...timer,
                name
            }));
        }

        setName("");
        
        navigation.navigate('Root', { timer });
    }

    const cancel = () => {
        navigation.goBack();
    }

    const themed = StyleSheet.create({
        modal: {
            ...styles.modal,
            backgroundColor: theme.backgroundDrawer
        },
        timerItemText: {
            ...styles.timerItemText,
            color: theme.textSecondary
        },
    })

    return (
        <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
            <View style={themed.modal}>
                <SceneTitle title='Add Timer' subtitle={label} />

                <View style={styles.input}>
                    <NameInput value={name} onChange={setName} />
                </View>

                <View style={styles.buttons}>
                    <ActionButton title="Cancel" onPress={cancel} />
                    <ActionButton title="Add" onPress={confirm} />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    modal: {
        height: 350,
        width: 400, 
        borderRadius: 10,
        shadowRadius: 19,
        shadowColor: 'rgba(0,0,0, 0.9)',
        alignSelf: 'center',
        justifyContent: "space-between"
    },
    input: {
       marginTop: 40, 
       marginHorizontal: 20
    },
    buttons: {
        ...Layout.row,
        justifyContent: 'space-between',
        marginTop: 30,
    },
    timerItemText:  {
        ...Typography.lightFont,
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 25,
        width: 140
    }
})