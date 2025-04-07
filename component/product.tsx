import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ProductComponent = React.memo((props: any) => {
    const { id, imageUrl, productName, attribute, price, quantity, navigation } = props;

    const formatPrice = (value: number) => {
        return value.toLocaleString('vi-VN') + ' đ';
    };

    return attribute !== undefined ? (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {navigation.navigate('Detail')}}

        >
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{ uri: imageUrl }} />
            </View>
            <Text style={styles.name}>{productName}</Text>
            {attribute && <Text style={styles.attribute}>{attribute}</Text>}
            <Text style={styles.price}>{formatPrice(price)}</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            style={styles.container2}
            onPress={() => {navigation.navigate('Detail');}}
        >
            <View style={styles.imgContainer2}>
                <Image style={styles.img} source={{ uri: imageUrl }} />
            </View>
            <View>
                <Text style={styles.name}>{productName}</Text>
                <Text style={styles.name}>{formatPrice(price)}</Text>
                <Text style={styles.quantity}>Còn {quantity} sp</Text>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    imgContainer: {
        height: 150,
        borderRadius: 10,
        backgroundColor: "#f6f6f6",
        overflow: 'hidden',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    name: {
        color: "#000",
        fontSize: 18,
    },
    attribute: {
        color: "#949090",
        fontSize: 15,
    },
    price: {
        color: "#4CAF50",
        fontSize: 18,
    },
    container2: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 20,
    },
    imgContainer2: {
        height: 120,
        width: 120,
        borderRadius: 10,
        backgroundColor: "#f6f6f6",
        overflow: 'hidden',
        marginRight: 20,
    },
    quantity: {
        fontSize: 16,
    },
});

export default ProductComponent;