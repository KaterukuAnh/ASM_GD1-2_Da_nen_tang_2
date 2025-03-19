import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";

interface ProductItem {
    id: string;
    name: string;
    price: number;
    attribute: string;
    imageUrl: string;
}

const ProductComponent: React.FC<ProductItem> = ({ id, name, attribute, price, imageUrl }) => {
    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden"
    },
    productImage: {
        width: "100%",
        height: 200,
    },
    infoContainer: {
        padding: 8,
        gap: 4
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