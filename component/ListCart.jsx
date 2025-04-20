import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { memo, useState, useEffect } from "react";
import CheckBox from "expo-checkbox";
import { FlashList } from "@shopify/flash-list";

const ListCart = memo((props) => {
    const { data, onCheckboxChange, onDelete, onQuantityChange } = props;
    const [selectedItems, setSelectedItems] = useState([]);

    // Cập nhật selectedItems khi data thay đổi
    useEffect(() => {
        // Reset selectedItems nếu data rỗng
        if (data.length === 0) {
            setSelectedItems([]);
            onCheckboxChange([]);
        } else {
            // Loại bỏ các item không còn trong data
            const updatedSelectedItems = selectedItems.filter(item =>
                data.some(dataItem => dataItem.id === item.id)
            );
            setSelectedItems(updatedSelectedItems);

            const selectedIds = updatedSelectedItems
                .filter(item => item.selected)
                .map(item => item.id);
            onCheckboxChange(selectedIds);
        }
    }, [data]);

    const handleCheckboxChange = (id, value) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedItems = [...prevSelectedItems];
            const existingIndex = updatedItems.findIndex((item) => item.id === id);

            if (existingIndex > -1) {
                updatedItems[existingIndex].selected = value;
            } else {
                updatedItems.push({ id, selected: value });
            }

            const selectedIds = updatedItems
                .filter((item) => item.selected)
                .map((item) => item.id);

            onCheckboxChange(selectedIds);
            return updatedItems;
        });
    };

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            Alert.alert(
                "Xác nhận",
                "Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?",
                [
                    { text: "Hủy", style: "cancel" },
                    { text: "Xóa", onPress: () => onDelete(id), style: "destructive" },
                ],
                { cancelable: true }
            );
        } else {
            onQuantityChange(id, quantity);
        }
    };

    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    };

    if (!data || data.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không có sản phẩm trong giỏ hàng</Text>
            </View>
        );
    }

    return (
        <FlashList
            data={data}
            estimatedItemSize={200}
            extraData={selectedItems}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                const isSelected = selectedItems.find(i => i.id === item.id)?.selected || false;

                return (
                    <View style={styles.itemContainer}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={(value) => handleCheckboxChange(item.id, value)}
                            color={isSelected ? "#007537" : undefined}
                            style={styles.check}
                        />
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.itemContent}>
                            <Text style={styles.textL}>{item.name}</Text>
                            <Text style={[styles.textL, { color: "#007537", marginTop: 4 }]}>
                                {formatCurrency(item.price)}
                            </Text>
                            <View style={styles.quantityRow}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '80%',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        style={styles.iconBlock}
                                        onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Image
                                            style={styles.icon}
                                            source={require('../assets/images/minus-square.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.textM}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.iconBlock}
                                        onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Image
                                            style={styles.icon}
                                            source={require('../assets/images/plus-square.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onDelete(item.id)}>
                                        <Text style={styles.deleteText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                );
            }}
        />
    );
});

export default ListCart;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 12,
    },
    check: {
        marginRight: 12,
    },
    image: {
        width: 77,
        height: 77,
        borderRadius: 8,
        resizeMode: "contain",
        backgroundColor: "#F6F6F6",
        marginRight: 12,
    },
    itemContent: {
        flex: 1,
        justifyContent: "center",
    },
    textL: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "500",
    },
    textM: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 20,
        marginHorizontal: 20,
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    deleteText: {
        color: "#000",
        textDecorationLine: "underline",
        fontSize: 14,
        fontWeight: "700"
    },
    iconBlock: {
        padding: 6,
        borderRadius: 6,
        backgroundColor: '#F0F0F0',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    }
});