import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { map } from "lodash";
import Modal from "../Modal";

export default function AccountOptions(props) {
    const {userInfo} = props;
    const [showModal, setShowModal] = useState(true)

    const selectedComponent = (key) => {
        console.log(key);
    };
    const menuOptions = generateOptions(selectedComponent);
    // console.log(menuOptions);

    return (
        <View>
            {/* {map(menuOptions, (menu, index) => (
                <ListItem key={index}>
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                
            ))} */}

            {
                // menuOptions.map((l, i) => (
                map(menuOptions, (l, i) => (

                <ListItem 
                    key={i} 
                    bottomDivider 
                    onPress = {l.onPress}
                    >
                        {/* <Avatar source={{uri: l.avatar_url}} /> */}
                        <Icon type = {l.iconType}
                            name = {l.iconNameLeft}
                            color = {l.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{l.title}</ListItem.Title>
                        </ListItem.Content>
                        {/* <Icon type = {l.iconType}
                            name = {l.iconNameRight}
                            color = {l.iconColorRight}
                        /> */}
                        <ListItem.Chevron size={30} />
                </ListItem>
                ))
            }
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
                <Text> Hola mundo</Text>
            </Modal>
        </View>
    );
}
function generateOptions(selectedComponent){
    return [
        {
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("displayName"),
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("email"),
        },
        {
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("password"),
        },
    ];
}
const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
    }
});
