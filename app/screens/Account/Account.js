import React, { useState, useEffect } from "react";
import {View, Text} from "react-native";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
// import { firebaseApp } from 'firebase/app';
import { firebaseApp } from '../../utils/firebase';
import * as firebase from "firebase";
import Loading from "../../components/Loading";

export default function Account(){
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user)=>{
            !user ? setLogin(false) : setLogin(true);

        console.log(user);
        console.log(login);
        });
    }, []);

    if (login === null) return <Loading  isVisible = {true} text = {"Cargando..."} />


    return login ? <UserLogged /> : <UserGuest />;
}
