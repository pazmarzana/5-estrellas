import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopRestaurants from '../screens/TopRestaurants';

const Stack = createNativeStackNavigator();

export default function TopRestaurantsStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen 
                    name="top-restaurants" 
                    component={TopRestaurants}
                    options={{ title:"Los mejores Restaurantes" }}/>
            </Stack.Navigator>
    );
}