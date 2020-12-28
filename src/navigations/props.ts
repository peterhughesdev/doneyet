import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Timer } from '../util/timer';

type RootStackParamList = {
    Root: { timer: Timer } | undefined;
    Timer: { timer : Timer };
};

export type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Root'>,
    route: RouteProp<RootStackParamList, 'Root'>
};