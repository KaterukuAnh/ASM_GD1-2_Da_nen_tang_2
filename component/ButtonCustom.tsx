import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const ButtonCustom = ({ left, right, minus, plus, minusColor, btn, btnColor, onPress }: any) => (
    <TouchableOpacity>
        {[left, right].map((icon, index) =>
            icon && (
                <TouchableOpacity key={index} onPress={onPress} style={[styles.btnLeftOrRight, index === 0 ? { left: 24 } : { right: 24 }]}>
                    <Image source={icon} />
                </TouchableOpacity>
            )
        )}
        {minus && (
            <TouchableOpacity onPress={onPress}>
                <Image source={require('../assets/images/minus-square.png')} style={{ width: 30, height: 30, tintColor: minusColor }} />
            </TouchableOpacity>
        )}
        {plus && (
            <TouchableOpacity onPress={onPress}>
                <Image source={require('../assets/images/plus-square.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        )}
        {btn && (
            <TouchableOpacity onPress={onPress} style={[styles.btnContainer, { backgroundColor: btnColor }]}>
                <Text style={styles.textBtn}>{btn}</Text>
            </TouchableOpacity>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    textBtn: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
    },
    btnContainer: {
        padding: 15,
        backgroundColor: '#ABABAB',
        width: '100%',
        borderRadius: 8,
    },
    btnLeftOrRight: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 2,
        position: 'absolute',
    },
});

export default ButtonCustom;
