import React from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import { Avatar } from 'react-native-elements';
// import AvatarDefault from '../../../assets/img/avatar-default.jpg';
import { firebaseApp } from '../../utils/firebase';
import "firebase/auth";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements/dist/icons/Icon';

export default function InfoUser(props) {
    // doble deconstruring
    const {userInfo:{uid, photoURL, displayName, email}}=props;
    // console.log(photoURL);
    // console.log(displayName);
    // console.log(email);
    const changeAvatar = async () => {
        // console.log("change avatar...");
        // const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermission = await MediaLibrary.requestPermissionsAsync();
        const resultPermissionStatus = resultPermission.status;
        // console.log(resultPermission);
        // console.log(resultPermissionStatus);
        if(resultPermissionStatus === "denied"){
            // console.log("Es necesario aceptar los permisos de la galeria");
            ToastAndroid.showWithGravity("Es necesario aceptar los permisos de la galeria", ToastAndroid.LONG, ToastAndroid.CENTER);
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3],
            });
            // console.log(result);
            if(result.cancelled){
                ToastAndroid.showWithGravity("Has cerrado la seleccion de imagenes", ToastAndroid.LONG, ToastAndroid.CENTER);

            }else{
                uploadImage(result.uri).then( () => {
                    // console.log("Imagen subida");
                    updatePhotoUrl();
                }).catch( () => {
                    ToastAndroid.showWithGravity("Error al actualizar el avatar", ToastAndroid.LONG, ToastAndroid.CENTER);
                });
            }
        }
    };

    const uploadImage=async(uri)=>{
        const response = await fetch(uri);
        // console.log(JSON.stringify(response));
        const blob = await response.blob();
        // console.log(JSON.stringify(blob));
        const ref = firebaseApp.storage().ref().child(`avatar/${uid}.jpg`);
        return ref.put(blob);
    }
    const updatePhotoUrl = () => {
        firebaseApp
        .storage()
        .ref(`avatar/${uid}.jpg`)
        .getDownloadURL()
        .then( async (response) => {
            // console.log(response);
            const update = {
                photoURL: response
            };
            await firebaseApp.auth().currentUser.updateProfile(update);
        }).catch(()=>{
            ToastAndroid.showWithGravity("Error al actualizar el avatar", ToastAndroid.LONG, ToastAndroid.CENTER);
        })
    }
    return(
        <View style={styles.viewUserInfo}>
            {/* <Text>INFOUSER May</Text> */}
            {/* // Standard Avatar with accessory */}
            <Avatar
            rounded
            size="large"
            showAccessory
            // onEditPress={changeAvatar}
            containerStyle={styles.UserInfoAvatar}
            source={ photoURL ? {uri: photoURL} : require('../../../assets/img/avatar-default.jpg') }
            >
            <Avatar.Accessory size={25} onPress={changeAvatar} />
            </Avatar>
            <View>
                <Text style={styles.displayName}>{ displayName ? displayName : 'Anonimo' }</Text>
                <Text>{ email ? email : 'Social Login' }</Text>
            </View>
        </View>
    );
}
const styles=StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    UserInfoAvatar:{
        marginRight: 20,
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5,
    }
});
