import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "@/component/textInputL_R";
import CustomButton from "@/component/buttonL_R";

const Register = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
                enableOnAndroid={true}
            >
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.imgbgr}
                        source={require("../assets/images/Ellipse 1.png")}
                    />
                </View>

                <Text style={styles.welcomeText}>Đăng ký</Text>
                <Text style={styles.subtitle}>Tạo tài khoản</Text>

                <CustomTextInput placeholder="Họ tên" />
                <CustomTextInput placeholder="E-mail" />
                <CustomTextInput placeholder="Số điện thoại" />
                <CustomTextInput placeholder="Mật khẩu" secureTextEntry hasToggle />

                <View>
                    <Text style={styles.reviewText}>Để đăng ký tài khoản, bạn đồng ý <Text style={styles.reviewColor}>Terms & Conditions</Text> and <Text style={styles.reviewColor}>Privacy Policy</Text></Text>
                </View>

                <CustomButton title="Đăng ký" onPress={() => console.log("Login Pressed")} />

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

                {/* Tạo tài khoản */}
                <Text style={styles.registerText}>
                    Bạn đã có tài khoản?{" "}
                    <Text style={styles.registerLink}>Đăng nhập</Text>
                </Text>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

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
        height: 200,
        overflow: "hidden",
    },
    imgbgr: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
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
        right: 150,
        zIndex: 10
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
    reviewText: {
        textAlign: "center"
    },
    reviewColor: {
        color: "#007537",
        textDecorationLine: "underline"
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
        color: "#1DB954",
        fontWeight: "300",
    },
})

export default Register;