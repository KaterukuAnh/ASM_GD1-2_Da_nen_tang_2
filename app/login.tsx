import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Platform,
} from "react-native";
import taoAxiosInstance from "@/api/sever";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "@/component/textInputL_R";
import CustomButton from "@/component/buttonL_R";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }: any) => {
    const axiosInstance = taoAxiosInstance();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/users/login", {
                email,
                password,
            });

            console.log("Đăng nhập thành công:", response);
            navigation.navigate("HomeTabs");
        } catch (error: any) {
            setError("Invalid email or Password. Try Again!");
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
                enableOnAndroid={true}>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imgbgr}
                        source={require("../assets/images/Ellipse 1.png")}
                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.nutBack}>
                        <Image
                            source={require("../assets/images/ep_arrow-right-bold.png")}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.welcomeText}>Chào mừng bạn</Text>
                <Text style={styles.subtitle}>Đăng nhập tài khoản</Text>

                <CustomTextInput placeholder="Nhập email hoặc số điện thoại" value={email} onChangeText={setEmail} />
                <CustomTextInput placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword} />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.cb}>
                    <TouchableOpacity style={styles.cb_2}>
                        <Image
                            source={require("../assets/images/ri_checkbox-circle-line (1).png")}
                        />
                        <Text>Nhớ mật khẩu</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerLink}>Quên mật khẩu</Text>
                </View>

                <CustomButton title="Đăng nhập" onPress={handleLogin} />

                <View style={styles.dividerContainer}>
                    <LinearGradient
                        style={styles.divider}
                        colors={["#007537", "#4CAF50"]}
                    />
                    <Text style={styles.orText}>Hoặc</Text>
                    <LinearGradient
                        style={styles.divider}
                        colors={["#007537", "#4CAF50"]}
                    />
                </View>

                <View style={styles.socialLoginContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={require("../assets/images/flat-color-icons_google.png")}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={require("../assets/images/logos_facebook.png")}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.registerText}>
                    Bạn không có tài khoản?{" "}
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.registerLink}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </Text>
            </KeyboardAwareScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        height: 300,
        overflow: "hidden",
    },
    imgbgr: {
        width: "100%",
        height: "120%",
        resizeMode: "contain",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    nutBack: {
        backgroundColor: "#F8EEC0",
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        position: "absolute",
        top: -270,
        right: 150

    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginTop: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "black",
        fontWeight: "500",
        marginBottom: 20,
    },
    cb: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 115,
        marginVertical: 5,
        marginBottom: 20
    },
    cb_2: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 5
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        marginVertical: 10,
    },
    divider: {
        flex: 1,
        height: 1,
        marginHorizontal: 10,
    },
    orText: {
        fontSize: 16,
        color: "black",
        fontWeight: "500",
        marginVertical: 10,
    },
    socialLoginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    socialButton: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
    registerText: {
        fontSize: 14,
        color: "black",
        fontWeight: "500",
        marginTop: 20,
    },
    registerLink: {
        color: "#009245",
        fontWeight: "300",
    },
    errorText: {
        color: "red",
        marginBottom: 10
    },
});

export default Login;
