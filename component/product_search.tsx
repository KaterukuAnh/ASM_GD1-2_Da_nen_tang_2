import React from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface productSearch {
    _id: string;
    imageUrl: ImageSourcePropType;
    name: string;
    price: number;
    quantity: number;
}

const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

const ProductSearch: React.FC<productSearch> = ({ _id, imageUrl, name, price, quantity }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl.toLocaleString() }}
                style={styles.img}
                resizeMode="contain"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.price}>{formatPrice(price)}</Text>
                <Text style={styles.quantity}>Còn {quantity} sp</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "60%",
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#F8F8FF",
        overflow: "hidden",
        marginHorizontal: 80,
        marginTop: 15
    },
    img: {
        width: 60,
        height: 60,
    },
    infoContainer: {
        marginLeft: 10,
        flex: 1,
    },
    text: {
        fontSize: 10,
    },
    price: {
        fontSize: 12,
        color: "black",
        marginTop: 5,
    },
    quantity: {
        fontSize: 12,
        color: "black",
        marginTop: 3,
    },
});

export default ProductSearch;
