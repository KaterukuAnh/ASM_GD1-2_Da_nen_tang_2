import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import Header from '@/component/Header';
import ListCart from '../component/ListCart';
import Muc from '@/component/Muc';
import Button from '@/component/Button';
import { useCart } from './CartProvider';
import LoadingComponent from '@/component/LoadingComponent';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const formatCurrency = (amount) => {
        // Make sure amount is a number to avoid formatting issues
        const numericAmount = Number(amount) || 0;
        return numericAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    };

    const handleCheckboxChange = (updatedItems) => {
        setSelectedItems(updatedItems);
    };

    const getSelectedProd = () => {
        // More robust filtering
        return cartItems.filter(item => 
            item && item.id && selectedItems.includes(item.id)
        );
    };

    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const selectedProduct = getSelectedProd();
        // Add safety check for price and quantity
        const total = selectedProduct.reduce((acc, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return acc + (price * quantity);
        }, 0);
        setTotalPrice(total);
    }, [selectedItems, cartItems]);

    const handleDeleteItem = (id) => {
        // Direct call with id
        removeFromCart(id);
        // Update selected items
        setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    };

    const handleQuantityChange = (id, quantity) => {
        updateQuantity(id, quantity);
    };

    return (
        <View style={styles.mainContainer}>
            <Header
                title="Giỏ hàng"
                back={require('../assets/images/chevron-left.png')}
                backFunc={() => navigation.goBack()}
                icon={require('../assets/images/shopping-cart.png')}
            />
            {loading ? (
                <LoadingComponent />
            ) : cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
                </View>
            ) : (
                <>
                    <View style={styles.container}>
                        <ListCart
                            data={cartItems}
                            onCheckboxChange={handleCheckboxChange}
                            onDelete={handleDeleteItem}
                            onQuantityChange={handleQuantityChange}
                        />
                    </View>
                    <View style={styles.footer}>
                        <Muc
                            title={"Tạm tính"}
                            content={formatCurrency(totalPrice)}
                            borderWidth={0}
                            size={16}
                            color={"#000000"}
                            textColor={"#666666"}
                            marB={10}
                        />
                        <Button
                            title="Tiến hành thanh toán"
                            bgColor={"#007537"}
                            func={() => {
                                if (selectedItems.length > 0) {
                                    const selectedProducts = getSelectedProd();
                                    navigation.navigate('Payment', { 
                                        selectedItems: selectedProducts, 
                                        totalPrice: totalPrice
                                    });
                                } else {
                                    Alert.alert(
                                        "Thông báo", 
                                        "Vui lòng chọn ít nhất một sản phẩm để thanh toán"
                                    );
                                }
                            }}
                        />
                    </View>
                </>
            )}
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1,
        padding: 10,
    },
    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 28,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    }
});