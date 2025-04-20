import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'

const TextInputCompoment = React.memo((props: any) => {
    const { placeholder, value, onChangeText, secureTextEntry, iconHidden } = props;
    const [hidden, setHidden] = useState(secureTextEntry);

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.inputText}
                placeholder={placeholder}
                placeholderTextColor={"#949090"}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={hidden}
            />
            <TouchableOpacity
                onPress={() => {
                    setHidden(!hidden);
                }}>
                <Image source={iconHidden} />
            </TouchableOpacity>
        </View>

    )
})

export default TextInputCompoment;

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '90%',
        borderWidth: 1,
        color: "#000",
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputText: {
        width: '70%',
        color: "#000",
    },
})