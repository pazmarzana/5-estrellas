import React, { useState } from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Loading from "../Loading";
import { validateEmail } from '../../utils/validations';
import { size, isEmpty } from 'lodash';
import { firebaseApp } from '../../utils/firebase';
// import * as firebase from "firebase";
import "firebase/auth";
import firebase from 'firebase/app';
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm() {
    // const {toastRef } = props; 
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = ()=>{
        if ( isEmpty(formData.email) || isEmpty(formData.password) 
        || isEmpty(formData.repeatPassword) ){
            console.log("Todos los campos son obligatorios");
            ToastAndroid.showWithGravity("Todos los campos son obligatorios", ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if ( !validateEmail(formData.email) ){
                console.log("Email no valido");
                ToastAndroid.showWithGravity("Email no valido", ToastAndroid.LONG, ToastAndroid.CENTER);
            } else if ( formData.password !== formData.repeatPassword ){
                console.log("Las contraseñas deben ser iguales");
                ToastAndroid.showWithGravity("Las contraseñas deben ser iguales", ToastAndroid.LONG, ToastAndroid.CENTER);
            } else if ( size(formData.password) < 6 ){
                console.log("La contraseña tiene que tener al menos 6 caracteres");
                ToastAndroid.showWithGravity("La contraseña tiene que tener al menos 6 caracteres", ToastAndroid.LONG, ToastAndroid.CENTER);
            }
         else{
            setLoading(true);
            firebaseApp.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then((response) => {
                console.log(response);
                setLoading(false);
                ToastAndroid.showWithGravity("Usuario creado correctamente", ToastAndroid.LONG, ToastAndroid.CENTER);
                navigation.navigate("account");
                // Signed in 
                // var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                ToastAndroid.showWithGravity("Error al crear usuario", ToastAndroid.LONG, ToastAndroid.CENTER);
                // poner toast; 
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // ..
            });
         }   
    };   
    const onChange = (e, type)=>{
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }
    return (
        <View style={StyleSheet.formContainer}>
            <Input 
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={ (e) => onChange(e, "email")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle = {styles.iconRight}
                    />
                }
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={ (e) => onChange(e, "password")}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.iconRight}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
            />
            <Input 
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                onChange={ (e) => onChange(e, "repeatPassword")}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle = {styles.iconRight}
                        onPress={()=>setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button 
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress = {onSubmit}
            />
            <Loading isVisible={loading} text="Creando cuenta"/>
        </View>
    )
}

function defaultFormValue(){
    return{
        email: "",
        password: "",
        repeatPassword: "",
    };
}
const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    btnContainerRegister: {
        width: "95%",
        marginTop: 20,
    },
    btnRegister:{
        backgroundColor: "#00a680",
    },
    iconRight:{
        color: "#c1c1c1",
    }
});