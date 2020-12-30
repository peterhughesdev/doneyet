import React, { useState } from 'react';

import { View, StyleSheet, Text } from 'react-native';
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
        <View style={styles.container}>
             <View style={themed.modal}>
                <SceneTitle title='Set Timer' subtitle={'Timer: ' + label} />

                <View style={styles.input}>
                    <NameInput value={name} onChange={setName} />
                </View>

                <View style={styles.buttons}>
                    <ActionButton title="Cancel" onPress={cancel} />
                    <ActionButton title="Add" onPress={confirm} />
                </View>
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'flex-end'
    },
    modal: {
        height: "50%", 
        width: '100%', 
        justifyContent: "flex-start"
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