import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import Wrapper from '@/component/Wrapper';
import Header from '@/component/Header';
import Button from '@/component/Button';
import LoadingComponent from '@/component/LoadingComponent';
import AxiosInstance from '@/api/sever';
import { useRoute } from '@react-navigation/native';
import { useCart } from './CartProvider';

const Detail = ({ navigation }) => {
    const route = useRoute();
    const { productID } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const res = await AxiosInstance(null).get(`/products/${productID}`);
                console.log("API response:", res);
                setProduct(res);
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productID]);

    const handleAddToCart = () => {
        if (!product || count <= 0) {
            Alert.alert("Thông báo", "Vui lòng chọn ít nhất 1 sản phẩm để thêm vào giỏ hàng.");
            return;
        }
    
        // Kiểm tra và đảm bảo productID được truyền đúng
        console.log("Adding product to cart with ID:", product.id);
        
        // Đảm bảo sản phẩm có ID hợp lệ
        if (!product._id) {
            console.error("Product has no valid ID!");
            Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng!");
            return;
        }
    
        addToCart({
            id: product._id.toString(), // Đảm bảo ID là string
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            quantity: count,
        });
    
        Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
    };

    if (loading || !product) {
        return <LoadingComponent />;
    }

    const formatPrice = (value) => {
        return value.toLocaleString('vi-VN') + ' đ';
    };

    const decrease = () => {
        if (count === 0) return;
        const newCount = count - 1;
        setCount(newCount);
        if (product) setTotalPrice(newCount * product.price);
    };

    const increase = () => {
        if (product && count < product.quantity) {
            const newCount = count + 1;
            setCount(newCount);
            setTotalPrice(newCount * product.price);
        }
    };

    return (
        <Wrapper>
            <Header
                title={product.name}
                back={require('../assets/images/chevron-left.png')}
                backFunc={() => navigation.goBack()}
                icon={require('../assets/images/shopping-cart.png')}
                iconFunc={() => navigation.navigate('Cart')} />
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.imgContainer}>
                        <View style={styles.imgShow}>
                            <Image
                                style={styles.img}
                                source={{ uri: product.imageUrl }}
                            />
                        </View>
                        <View style={styles.btnImg}>
                            <TouchableOpacity style={styles.btn}>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/images/chevron-left.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/images/chevron-left.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.rowContainer}>
                            <View style={styles.block}>
                                <Text style={styles.blockText}>{product.type}</Text>
                            </View>
                            <View style={styles.block}>
                                <Text style={styles.blockText}>{product.attribute}</Text>
                            </View>
                        </View>
                        <Text style={styles.textPrice}>
                            {formatPrice(product.price)}
                        </Text>
                        <View
                            style={[
                                styles.detailBlock,
                                { borderBottomColor: "#000" },
                            ]}>
                            <Text style={styles.text1}>Chi tiết sản phẩm</Text>
                        </View>
                        <View
                            style={[
                                styles.detailBlock,
                                { borderBottomColor: "#ABABAB" },
                            ]}>
                            <Text>Kích cở</Text>
                            <Text>{product.size}</Text>
                        </View>
                        <View
                            style={[
                                styles.detailBlock,
                                { borderBottomColor: "#ABABAB" },
                            ]}>
                            <Text>Xuất xứ</Text>
                            <Text>{product.origin}</Text>
                        </View>
                        <View
                            style={[
                                styles.detailBlock,
                                { borderBottomColor: "#ABABAB" },
                            ]}>
                            <Text>Tình trạng</Text>
                            <Text>Còn {product.quantity} sp</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={styles.priceContainer}>
                <View
                    style={[
                        styles.rowContainer,
                        { justifyContent: 'space-between', width: '90%' },
                    ]}>
                    <Text style={styles.text2}>Đã chọn {count} sản phẩm</Text>
                    <Text style={styles.text2}>Tạm tính</Text>
                </View>
                <View
                    style={[
                        styles.rowContainer,
                        { justifyContent: 'space-between', width: '90%' },
                    ]}>
                    <View
                        style={[
                            styles.rowContainer,
                            {
                                justifyContent: 'space-between',
                                width: '40%',
                                marginVertical: 10,
                            },
                        ]}>
                        <TouchableOpacity
                            style={styles.block1}
                            onPress={decrease}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/minus-square.png')}
                            />
                        </TouchableOpacity>
                        <Text>{count}</Text>
                        <TouchableOpacity
                            style={styles.block1}
                            onPress={increase}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/plus-square.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text>{formatPrice(totalPrice)}</Text>
                </View>
                <Button title="Chọn mua" bgColor={"#009245"} func={handleAddToCart} />
            </View>
        </Wrapper>
    )
}

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgContainer: {
        position: 'relative',
        height: 200,
    },
    imgShow: {
        width: '100%',
        height: '100%',
        backgroundColor: "#f6f6f6",
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    btnImg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    btn: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 15,
    },
    icon: {
        width: 15,
        height: 15,
    },
    detailContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    block: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#009245",
        marginRight: 5,
    },
    blockText: {
        color: "#fff",
    },
    textPrice: {
        color: "#009245",
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    text1: {
        fontSize: 20,
        color: "#000",
    },
    detailBlock: {
        marginVertical: 5,
        paddingVertical: 5,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    text2: {
        fontSize: 16,
        color: "#ABABAB",
    },
    block1: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});