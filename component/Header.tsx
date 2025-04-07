import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = React.memo((props: any) => {
    const { title, back, backFunc, icon, onPress, navigation } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={backFunc}>
                <Image style={styles.icon} source={back} />
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity>
                <Image style={styles.icon} source={icon} />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
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
});

export default Header;
