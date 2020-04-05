import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text, Icon, Button, Divider, Layout, Modal } from '@ui-kitten/components';
import CircularSlider from 'react-native-circular-slider';
import * as Time from '../util/time';


/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const PlusIcon = (style) => (
    <Icon {...style} name='plus' />
);

export const HomeScreen = () => {
    const [timerSpan, setTimerSpan] = React.useState(0);

    const [startAngle, setStartAngle] = React.useState(0);
    const [angleLength, setAngleLength] = React.useState(0.4);

    const updateAngle = ({ startAngle, angleLength }) => {
        setAngleLength(angleLength);
        setTimerSpan(Time.calculateSecondsFromAngle(angleLength));
    };

    const [activeTimer, setActiveTimer] = React.useState(undefined);

    const startTimer = () => {
        // setInterval(() => {
        //     setTimerSpan(timerSpan - 100);
        //     setAngleLength(Time.calculateAngleFromSeconds(timerSpan - 100));
        // }, 1000);
    }

    const endtime = Time.calculateTimeFromAngle(angleLength % (2 * Math.PI));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={styles.container}>
                <Text style={styles.text} category='h1'>
                    Welcome to TimeFlow
          </Text>
                <Text style={styles.text} appearance='hint'>
                    Time: {Time.formatTime(endtime)}
                </Text>
                <Divider />

                <CircularSlider
                    startAngle={startAngle}
                    angleLength={angleLength}
                    onUpdate={updateAngle}
                    segments={5}
                    strokeWidth={20}
                    radius={115}
                    gradientColorFrom="#ff9800"
                    gradientColorTo="#ffcf00"
                    clockFaceColor="#9d9d9d"
                    bgCircleColor="#171717"
                />

                <Divider />
                <Button style={styles.likeButton} appearance='outline' status='basic' onPress={startTimer}>Start timer</Button>
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 35
    },
    modalContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        width: 256,
        padding: 16,
        borderRadius: 4
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerControl: {
        marginHorizontal: 4
    },
    text: {
        textAlign: 'center',
    },
    likeButton: {
        marginVertical: 16,
    }
});