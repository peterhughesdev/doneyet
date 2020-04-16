import  {StyleSheet} from 'react-native';
import { iOSUIKit, iOSColors } from 'react-native-typography'

import colours from '../styles/colours.json';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 35,
        backgroundColor:  colours.background
    },
    row: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        flexDirection: 'row',
        backgroundColor:  colours.background
    },
    header: {
        marginTop: 50,
        alignItems: 'flex-start',
        backgroundColor:  colours.background
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    picker: {
        height: 50, 
        width: 150
    },
    pickerItem: {
        color: 'white'
    },
    card: {
        flex: 1,
        margin: 2,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...iOSUIKit.largeTitleEmphasizedObject,
        color: colours.active,
        textAlign: 'center'
    },
    subtitle: {
        ...iOSUIKit.subheadEmphasizedWhiteObject,
        color: colours.paleWarm,
        textAlign: 'center'
    },
    buttonText: {
        ...iOSUIKit.calloutWhiteObject,
        color: colours.paleBright
    },
    cardTitle:  {

    },
    cardText:  {

    },
    text: {
        textAlign: 'center',
    },
    actionButton: {
        marginLeft: 15,
        marginRight: 15,
        marginVertical: 30,
        
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 2
    },
    startButton: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: colours.active,
        borderColor: colours.active,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 2
    },
    queueButton: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        borderColor: colours.active,
        backgroundColor:  colours.background
    },
    clearQueueButton: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        borderColor: colours.active,
        backgroundColor:  colours.background
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    queue: {
        backgroundColor: colours.background
    },
    queueItem:  {
        backgroundColor: colours.background,
        fontSize: 20
    },
    queueItemText:  {
        fontSize: 40
    },
    listButton: {
        color: colours.active,
        marginLeft: 18,
        fontSize: 20
    },
    background: {
        backgroundColor:  colours.background
    }
});