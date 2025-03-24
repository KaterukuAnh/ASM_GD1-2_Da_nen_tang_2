import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from "react-native";
const SearchComponent = ({ title }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgI}>
                <Image
                    source={require("../assets/images/clock.png")}
                />
            </View>
            <View style={styles.txtT}>
                <Text style={{fontSize: 16, fontWeight: "600"}}>{title}</Text>
            </View>
            <View style={styles.imgX}>
                <Image
                    source={require("../assets/images/quit.png")}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 80,
        alignItems: "center",
        justifyContent: "space-between"
    },
    txtT: {
        width: "40%",
    },
    imgI: {
        width: 0
    },
    imgX: {
        width: "30%",
        alignItems: "flex-end"

    }
})

export default SearchComponent;