import React, { useState } from 'react';
import { StyleSheet, View, ToastAndroid } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from '../../utils/validations';
import { size, isEmpty } from 'lodash';
import { firebaseApp } from '../../utils/firebase';
import "firebase/auth";
import { useNavigation } from '@react-navigation/native';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = ()=>{
        if ( isEmpty(formData.email) || isEmpty(formData.password) ){
            console.log("Todos los campos son obligatorios");
            ToastAndroid.showWithGravity("Todos los campos son obligatorios", ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if ( !validateEmail(formData.email) ){
                console.log("Email no valido");
                ToastAndroid.showWithGravity("Email no valido", ToastAndroid.LONG, ToastAndroid.CENTER);
            } else if ( size(formData.password) < 6 ){
                console.log("La contraseña tiene que tener al menos 6 caracteres");
                ToastAndroid.showWithGravity("La contraseña tiene que tener al menos 6 caracteres", ToastAndroid.LONG, ToastAndroid.CENTER);
            }
         else{
            setLoading(true);
            firebaseApp.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .then((response) => {
                console.log(response);
                setLoading(false);
                ToastAndroid.showWithGravity("Usuario ha ingresado correctamente", ToastAndroid.LONG, ToastAndroid.CENTER);
                navigation.navigate("account");
                // Signed in 
                // var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                ToastAndroid.showWithGravity("Error al ingresar", ToastAndroid.LONG, ToastAndroid.CENTER);
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
        <View style={styles.formContainer}>    
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
            <Button 
                title="Unirse"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress = {onSubmit}
            />
        </View>
    )
}
function defaultFormValue(){
    return{
        email: "",
        password: "",
    };
}
const styles = StyleSheet.create({
    formContainer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    btnContainerLogin: {
        width: "95%",
        marginTop: 20,
    },
    btnLogin:{
        backgroundColor: "#00a680",
    },
    iconRight:{
        color: "#c1c1c1",
    }
});
