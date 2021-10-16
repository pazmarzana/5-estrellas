import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function InfoUser(props) {
    const {userInfo}=props;
    console.log(userInfo);
    return(
        <View>
            <Text>INFOUSER May</Text>
        </View>
    );
}
const styles=StyleSheet.create({

});
