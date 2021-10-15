import React from "react";
import {View, Text, Button} from "react-native";
import { firebaseApp } from '../../utils/firebase';
import "firebase/auth";

export default function UserLogged(){

    return(
        <View>
            <Text>UserLogged...</Text>
            <Button title="Cerrar sesion" onPress={() => firebaseApp.auth().signOut()}/>
        </View>
    );
}
