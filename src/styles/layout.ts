import { ViewStyle } from 'react-native';

export const full = {
    flex: 1
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