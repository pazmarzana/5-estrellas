import React from "react";
import {View, Text, Button} from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Restaurants(){
    const navigation = useNavigation();
    return(
        <View>
            <Text>Restaurants...</Text>
            <Button title="Ir a favorites" onPress={ ()=> navigation.navigate("favoritesStack")}/>
        </View>
    );
}
