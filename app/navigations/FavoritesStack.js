import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from '../screens/Favorites';

const Stack = createNativeStackNavigator();

export default function FavoritesStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen 
                    name="favorites" 
                    component={Favorites}
                    options={{ title:"Restaurantes Favoritos" }}/>
            </Stack.Navigator>
    );
}