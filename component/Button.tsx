import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = React.memo((props: any) => {
    const { title, bgColor, func } = props;
    return (
        <TouchableOpacity
            style={[styles.btn, { backgroundColor: bgColor }]}
            onPress={func}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
});

export default Button

const styles = StyleSheet.create({
    btn: {
        width: '90%',
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: '500',
        textAlign: "center"
    },
})