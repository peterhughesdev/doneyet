import { Dimensions, ViewStyle } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export const full = {
    flex: 1
}

export const fullWidth = {
    width: width
}

export const fullHeight = {
    height: height
}

export const vertical: ViewStyle = {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
}

export const horizontal: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
}

export const row = {
    ...full,
    ...horizontal
};

export const col = {
    flex: 1,
    ...vertical,
    paddingHorizontal: 15
}