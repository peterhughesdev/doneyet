import { Colours } from '../styles';

export interface Theme {
    backgroundWarm: string,
    backgroundCool: string
    textPrimary: string
    textSecondary: string,
    accent: string,
    name: string
}

export const Default: Theme = {
    name: "default",
    backgroundWarm: Colours.paleWarm,
    backgroundCool: Colours.paleCool,
    textPrimary: Colours.text,
    textSecondary: Colours.paleCool,
    accent: Colours.accent
}

export const Alt1: Theme = {
    name: "alt 1",
    backgroundWarm: Colours.accent,
    backgroundCool: Colours.accent,
    textPrimary: Colours.queue3,
    textSecondary: Colours.paleCool,
    accent: Colours.queue4
}

export const Alt2: Theme = {
    name: "alt 2",
    backgroundWarm: Colours.accent,
    backgroundCool: Colours.accent,
    textPrimary: Colours.queue3,
    textSecondary: Colours.paleCool,
    accent: Colours.queue4
}