import React from 'react';
import { StyleSheet, Component, View, Button, Text } from 'react-native';
import { Modal, Card, Spinner } from '@ui-kitten/components';

import { Colours, Typography } from '../styles';

interface TimerModalProps {
    visible: boolean,
    title: string,
    children: Component[]
}

const styles = StyleSheet.create({
    card: {
        margin: 2,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colours.paleCool,
        backgroundColor: Colours.paleCool
    },
    backdrop: {
        backgroundColor: Colours.modalBackdrop
    },
    headerText: {
        ...Typography.buttonText,
        color: Colours.text
    }
});

export const TimerModal = (props: TimerModalProps) => {
    const Header = () => (
        <View>
          <Text style={styles.headerText}>{props.title}</Text>
        </View>
    );
    
    return (
        <Modal visible={props.visible} backdropStyle={styles.backdrop}>
            <Card style={styles.card} disabled={true} status='success' header={Header}>
                {props.children}
            </Card>
        </Modal>
    );
}