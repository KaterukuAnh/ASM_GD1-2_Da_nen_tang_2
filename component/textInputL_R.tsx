import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from "react-native";

interface CustomTextInputProps {
    placeholder: string;
    value?: string;
    secureTextEntry?: boolean; // Có phải ô mật khẩu không?
    hasToggle?: boolean; // Có icon ẩn/hiện mật khẩu không?
    isSearch?: boolean; // Có phải ô tìm kiếm không?
    onChangeText?: (text: string) => void;
    onSubmitEditing?: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    value,
    secureTextEntry = false,
    hasToggle = false,
    isSearch = false,
    onChangeText,
    onSubmitEditing
}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [text, setText] = useState("");

    const handleTextChange = (value: string) => {
        setText(value);
        onChangeText?.(value); // Gửi dữ liệu ra ngoài nếu có truyền hàm
    };

    return (
        <View style={styles.inputContainer}>
            {/* Icon tìm kiếm nếu là ô tìm kiếm */}
            {isSearch && (
                <Image source={require("../assets/images/search.png")} style={styles.icon} />
            )}

            {/* Ô nhập liệu */}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#8B8B8B"
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                value={value}
                onChangeText={handleTextChange}
                onSubmitEditing={onSubmitEditing} 
            />

            {/* Icon ẩn/hiện mật khẩu nếu là ô mật khẩu */}
            {secureTextEntry && hasToggle && (
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
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
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    icon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
        tintColor: "#8B8B8B",
    },
});

export default CustomTextInput;
