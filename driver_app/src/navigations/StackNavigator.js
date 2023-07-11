import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import DestinationScreen from '../screens/DestinationScreen';
const Home = createNativeStackNavigator();

export function HomeStack(){
    return(
        <Home.Navigator>
            <Home.Screen 
                name ="HomeScreen"
                component = {HomeScreen}
                options ={{headerShown:false}}
            />
             <Home.Screen 
                name ="DestinationScreen"
                component = {DestinationScreen}
                options ={{headerShown:false}}
            /> 
        </Home.Navigator>
    )
}