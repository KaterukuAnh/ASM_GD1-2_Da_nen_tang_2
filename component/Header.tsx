import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const Header = React.memo((props: any) => {
    const { title, back, backFunc, icon, iconFunc, navigation } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={backFunc}>
                <Image style={styles.icon} source={back} />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity onPress={iconFunc}>
                <Image style={styles.icon} source={icon} />
            </TouchableOpacity>
        </View>
    );
});

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 21,
        fontWeight: '500',
        color: "#000",
    },
    icon: {
        width: 20,
        height: 20,
    },

})