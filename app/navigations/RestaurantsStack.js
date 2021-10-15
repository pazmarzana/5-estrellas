import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Restaurants from '../screens/Restaurants';
import Favorites from '../screens/Favorites';

const Stack = createNativeStackNavigator();

export default function RestaurantsStack(){
    return(
            <Stack.Navigator
            screenOptions={{ headerStyle: {
                            backgroundColor: '#f4511e',
                            },
                             headerTintColor: '#fff',
            }}>
                <Stack.Screen 
                    name="restaurants" 
                    component={Restaurants}
                    options={{ title:"Restaurantes 1",
                                headerStyle: {
                                    backgroundColor: '#f4511e',
                                },
                                headerTintColor: '#fff',
                    }}/>
                {/* <Stack.Screen 
                    name="favorites" 
                    component={Favorites}
                    options={{ title:"Restaurantes 2" }}/> */}
                {/* <Stack.Screen 
                    name="favorites" 
                    component={Favorites}
                    options={{ title:"Favoritos" }}/>
                <Stack.Screen 
                    name="top-restaurants" 
                    component={TopRestaurants}
                    options={{ title:"Top 5" }}/>
                <Stack.Screen 
                    name="search" 
                    component={Search}
                    options={{ title:"Buscar" }}/>
                <Stack.Screen 
                    name="account" 
                    component={Account}
                    options={{ title:"Cuenta" }}/> */}
            </Stack.Navigator>
    );
}