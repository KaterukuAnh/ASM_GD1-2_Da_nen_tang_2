import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Platform,
} from "react-native";

interface productItem {
    id: string,
    name: string,
    price: number,
    attribute: string,
    imageUrl: string

}

const product1: productItem[] = [
    {
        id: "1",
        name: "Phi vô tri",
        price: 20000000,
        attribute: "Hàng limited",
        imageUrl: "https://i.pinimg.com/originals/8a/f0/cf/8af0cf849d3afb612af209cd794cb3c2.jpg"
    },
    {
        id: "2",
        name: "Hoàng khùng",
        price: 20000000,
        attribute: "Hàng limited",
        imageUrl: "https://i.pinimg.com/originals/8a/f0/cf/8af0cf849d3afb612af209cd794cb3c2.jpg"
    },

]


const ProductComponent = () => {
    return(
        <View>

        </View>
    )

}

export default ProductComponent;