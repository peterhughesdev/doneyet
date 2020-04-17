import React from 'react';

import DropdownAlert from 'react-native-dropdownalert';

import { Colours } from '../styles';

interface ConfirmationDropdownProps {
    visible: boolean
}

export const ConfirmationDropdown = (props: ConfirmationDropdownProps) => {

    let dropdown: any;

    const setDropdown = (ref: any) => dropdown = ref;

    return (
        <DropdownAlert ref={setDropdown} infoColor={Colours.background} />
    )
}