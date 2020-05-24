import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Colours } from '../styles';

export const useTheme = () => {
    const theme = useSelector((state: RootState) => state.theme.active);

    switch (theme) {
        case 'rose pink':
            return Alt1;
        default:
            return Default;
    }
}

export interface Theme {
    backgroundTop: string,
    backgroundBottom: string,
    backgroundDrawer: string,

    textPrimary: string,
    textSecondary: string,

    iconInactive: string,
    iconActive: string,

    item: string,

    name: string
}

export const Default: Theme = {
    name: "default",

    backgroundTop: Colours.paleWarm,
    backgroundBottom: Colours.accent,
    backgroundDrawer: Colours.paleCool,

    textPrimary: Colours.text,
    textSecondary: Colours.paleCool,

    iconInactive: Colours.modalBackdrop,
    iconActive: Colours.paleBright,

    item: Colours.accent
}

export const Alt1: Theme = {
    name: "rose pink",

    backgroundTop: Colours.pink,
    backgroundBottom: Colours.paleBright,
    backgroundDrawer: Colours.paleBright,

    textPrimary: Colours.queue3,
    textSecondary: Colours.text,

    iconInactive: Colours.modalBackdrop,
    iconActive: Colours.queue3,

    item: Colours.paleBright
}
