import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({ title, onPress } : any) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <LinearGradient colors={["#007537", "#4CAF50"]} style={styles.gradient}>
                <Text style={styles.buttonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginVertical: 10,
        overflow: "hidden",
    },
    gradient: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

});

export default CustomButton;