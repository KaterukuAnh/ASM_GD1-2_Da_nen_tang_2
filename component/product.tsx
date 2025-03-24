import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";

interface ProductItem {
    _id: string;
    name: string;
    price: number;
    attribute: string;
    imageUrl: string;
    onPress: () => void;
}

const ProductComponent: React.FC<ProductItem> = ({ _id, name, attribute, price, imageUrl, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{width: "100%"}}>
            <View style={styles.container}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.productImage}
                    resizeMode="cover"
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.productName} numberOfLines={1}>{name}</Text>
                    <Text style={styles.attribute}>{attribute}</Text>
                    <Text style={styles.price}>{price.toLocaleString()}đ</Text>
                </View>
            </View>

        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 10,
        overflow: "hidden"
    },
    productImage: {
        width: "100%",
        height: 150,
        resizeMode: "contain"
    },
    infoContainer: {
        gap: 2
    },
    productName: {
        fontWeight: "600",
        fontSize: 16,
        width: "100%"
    },
    attribute: {
        color: "#7D7B7B",
        fontSize: 14
    },
    price: {
        color: "#007537",
        fontSize: 16
    }
});

export default ProductComponent;