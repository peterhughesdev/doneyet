import  {StyleSheet} from 'react-native';
import { iOSUIKit, iOSColors } from 'react-native-typography'

import colours from '../styles/colours.json';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 35
    },
    row: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    header: {
        marginTop: 50,
        alignItems: 'flex-start'
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
        marginVertical: 30
    },
    startButton: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: colours.active,
        borderColor: colours.active
    },
    queueButton: {
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        borderColor: colours.active,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    listContainer: {
        flexDirection: 'row'
    },
    listButton: {
        color: colours.active,
        marginLeft: 18,
        fontSize: 20
    }
});