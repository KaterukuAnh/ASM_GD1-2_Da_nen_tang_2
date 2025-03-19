import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from "react-native";
const SearchComponent = ({title} : any) => {
    return(
        <View style={styles.container}>
            <Image
                source={require("../assets/images/clock.png")}
            />
            <Text>{title}</Text>
            <Image
                source={require("../assets/images/quit.png")}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 80,
        justifyContent: "space-between"
    }
})

export default SearchComponent;