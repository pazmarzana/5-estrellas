import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import { Button } from 'react-native-elements';
import { firebaseApp } from '../../utils/firebase';
import "firebase/auth";
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");

    useEffect(() => {
        //funcion asincronica autoejecutable
       (async () => {
           const user = await firebaseApp.auth().currentUser;
        //    const user = await firebaseApp.Auth.currentUser;
            setUserInfo(user);
        //    console.log(user);
       })();
    }, [])
    return(
        <View style={ styles.viewUserInfo }>
            {userInfo && <InfoUser userInfo={userInfo} />}
            <Text>AccountOptions...</Text>
            <Button 
            title="Cerrar sesion"
            buttonStyle={styles.btnCloseSession}
            titleStyle = {styles.btnCloseSessionText }
             onPress={() => firebaseApp.auth().signOut()}/>
             {/* ToastAndroid.showWithGravity("dddd", ToastAndroid.LONG, ToastAndroid.CENTER); */}
        <Loading text={loadingText} isVisible={loading} />
        </View>
    );
}
const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
    },
    btnCloseSession:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,

    },
    btnCloseSessionText:{
        color: "#00a680",
    }
})
