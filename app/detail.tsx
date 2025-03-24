import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '@/component/Header';
import ButtonCustom from '@/component/ButtonCustom';
import Muc from '@/component/Muc';
import taoAxiosInstance from '@/api/sever';

const Detail = () => {
    const route = useRoute();
    const { _id } = route.params as { _id: string };

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const axios = taoAxiosInstance();
            try {
                const response = await axios.get(`/products/${_id}`);
                setProduct(response);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [_id]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007537" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Header
                    iconLeft={require('../assets/images/chevron-left.png')}
                    iconLeftColor="#000000"
                    title={product?.name || "Tên sản phẩm"}
                    iconRight={require('../assets/images/shopping-cart.png')}
                />
                <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                    <View style={styles.imgContainer}>
                        {product?.imageUrl ? (
                            <Image source={{ uri: product.imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                        ) : (
                            <Text style={styles.textM}>Không có ảnh</Text>
                        )}
                    </View>
                    <View style={{ paddingHorizontal: 48, paddingVertical: 14 }}>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Text style={styles.textBox}>{product?.type || "Loại sản phẩm"}</Text>
                            <Text style={styles.textBox}>{product?.attribute || "Thuộc tính"}</Text>
                        </View>
                        <Text style={[styles.textL, { color: '#007537', marginVertical: 17 }]}>
                            {product ? formatCurrency(product.price) : "Đang tải..."}
                        </Text>
                        <Muc title='Chi tiết sản phẩm' main={true} />
                        <Muc title="Kích cỡ" content={product?.size || "Đang cập nhật..."} />
                        <Muc title="Xuất xứ" content={product?.origin || "Đang cập nhật..."} />
                        <Muc title="Tình trạng" content={product?.quantity > 0 ? `Còn ${product.quantity} sp` : "Hết hàng"} color="#007537" />
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.textS}>Đã chọn {quantity} sản phẩm</Text>
                        <View style={{ justifyContent: 'space-between', paddingHorizontal: 24, flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
                            <ButtonCustom minus={true} onPress={() => quantity > 1 && setQuantity(quantity - 1)} />
                            <Text style={styles.textM}>{quantity}</Text>
                            <ButtonCustom plus={true} onPress={() => setQuantity(quantity + 1)} />
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.textS, { textAlign: 'right' }]}>Tạm tính</Text>
                        <Text style={[styles.textL, { textAlign: 'right' }]}>
                            {product ? formatCurrency(product.price * quantity) : "Đang tải..."}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonCustom btn="CHỌN MUA" btnColor={quantity > 0 ? '#007537' : '#ABABAB'} />
                </View>
            </View>

        </SafeAreaView>
        // <View style={{ flex: 1 }}>
        //     <Header
        //         iconLeft={require('../assets/images/chevron-left.png')}
        //         iconLeftColor="#000000"
        //         title={product?.name || "Tên sản phẩm"}
        //         iconRight={require('../assets/images/shopping-cart.png')}
        //     />
        //     <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        //         <View style={styles.imgContainer}>
        //             {product?.imageUrl ? (
        //                 <Image source={{ uri: product.imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
        //             ) : (
        //                 <Text style={styles.textM}>Không có ảnh</Text>
        //             )}
        //         </View>
        //         <View style={{ paddingHorizontal: 48, paddingVertical: 14 }}>
        //             <View style={{ flexDirection: 'row', gap: 8 }}>
        //                 <Text style={styles.textBox}>{product?.type || "Loại sản phẩm"}</Text>
        //                 <Text style={styles.textBox}>{product?.attribute || "Thuộc tính"}</Text>
        //             </View>
        //             <Text style={[styles.textL, { color: '#007537', marginVertical: 17 }]}>
        //                 {product ? formatCurrency(product.price) : "Đang tải..."}
        //             </Text>
        //             <Muc title='Chi tiết sản phẩm' main={true} />
        //             <Muc title="Kích cỡ" content={product?.size || "Đang cập nhật..."} />
        //             <Muc title="Xuất xứ" content={product?.origin || "Đang cập nhật..."} />
        //             <Muc title="Tình trạng" content={product?.quantity > 0 ? `Còn ${product.quantity} sp` : "Hết hàng"} color="#007537" />
        //         </View>
        //     </ScrollView>
        //     <View style={styles.bottomContainer}>
        //         <View>
        //             <Text style={styles.textS}>Đã chọn {quantity} sản phẩm</Text>
        //             <View style={{ justifyContent: 'space-between', paddingHorizontal: 24, flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
        //                 <ButtonCustom minus={true} onPress={() => quantity > 1 && setQuantity(quantity - 1)} />
        //                 <Text style={styles.textM}>{quantity}</Text>
        //                 <ButtonCustom plus={true} onPress={() => setQuantity(quantity + 1)} />
        //             </View>
        //         </View>
        //         <View>
        //             <Text style={[styles.textS, { textAlign: 'right' }]}>Tạm tính</Text>
        //             <Text style={[styles.textL, { textAlign: 'right' }]}>
        //                 {product ? formatCurrency(product.price * quantity) : "Đang tải..."}
        //             </Text>
        //         </View>
        //     </View>
        //     <View style={styles.buttonContainer}>
        //         <ButtonCustom btn="CHỌN MUA" btnColor={quantity > 0 ? '#007537' : '#ABABAB'} />
        //     </View>
        // </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    imgContainer: {
        height: 250,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textS: {
        fontSize: 14,
        fontWeight: 'regular',
        color: '#3A3A3A',
    },
    textM: {
        fontSize: 16,
        fontWeight: 'regular',
    },
    textL: {
        fontSize: 24,
        fontWeight: 'medium',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
    },
    buttonContainer: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    textBox: {
        color: '#FFFFFF',
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#009245',
        borderRadius: 4,
    },
});

export default Detail;
