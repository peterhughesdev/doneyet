import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../scenes/home';

const HomeNavigator = createStackNavigator({
    Home: HomeScreen
}, {
    headerMode: 'none',
});

export const AppNavigator = createAppContainer(HomeNavigator);