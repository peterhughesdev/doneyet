import { iOSUIKit, iOSColors } from 'react-native-typography'
import { TextStyle } from 'react-native';

export const lightFont: TextStyle = {
    fontFamily: 'Helvetica Neue',
    fontWeight: '100'
}

export const title: TextStyle = {
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...lightFont,
    textAlign: 'center',
    textTransform: 'uppercase'
};

export const subtitle: TextStyle = {
    ...iOSUIKit.subheadEmphasizedWhiteObject,
    textAlign: 'center'
};

export const buttonText: TextStyle = {
    ...iOSUIKit.calloutWhiteObject,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica Neue',
    fontWeight: '100',
    textAlign: 'center',
    fontSize: 26
};

export const textShadow: TextStyle = {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2
}