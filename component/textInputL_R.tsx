import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";

interface CustomTextInputProps {
    placeholder: string;
    secureTextEntry?: boolean;
    hasToggle?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, secureTextEntry = false, hasToggle = false }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#8B8B8B"
                secureTextEntry={secureTextEntry && !isPasswordVisible}
            />
            {secureTextEntry && hasToggle && (
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.iconContainer}>
                    <Image
                        source={
                            isPasswordVisible
                                ? require("../assets/images/ant-design_eye-filled.png")
                                : require("../assets/images/ant-design_eye-invisible-filled.png")
                        }
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#8B8B8B",
        paddingHorizontal: 20,
        height: 50,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    iconContainer: {
        padding: 5,
    },
    icon: {
        width: 24,
        height: 24,
    },

});

export default CustomTextInput;