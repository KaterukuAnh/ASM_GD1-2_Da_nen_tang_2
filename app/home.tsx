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
import { FlashList } from "@shopify/flash-list";

const Home = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.txtTitle}>
                        Planta - tỏa sáng
                    </Text>
                    <Text style={styles.txtTitle}>
                        không gian nhà bạn
                    </Text>
                    <TouchableOpacity style={styles.bgrCart}>
                        <Image
                            source={require("../assets/images/shopping-cart.png")}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.containerNew}>
                    <Image
                        style={{ width: "100%"}}
                        source={require("../assets/images/image_9-removebg-preview 1.png")}
                    />
                    <TouchableOpacity style={{position: "absolute", bottom: 180, marginHorizontal: 20}}>
                        <Text style={{ color: "#007537", fontSize: 16, fontWeight: "medium" }}>Xem hàng mới về -{">"}</Text>
                    </TouchableOpacity>
                </View>

                
            </View>
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

    },
    txtTitle: {
        color: "#221F1F",
        fontWeight: "medium",
        fontSize: 24

    },
    bgrCart: {
        backgroundColor: "blue",
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 0
    },
    containerNew: {
        position: "relative",
        width: "100%"
    }
})

export default Home;