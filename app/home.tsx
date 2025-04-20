import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import Wrapper from '@/component/Wrapper';
import AxiosInstance from '@/api/sever';
import { FlashList } from '@shopify/flash-list';
import ProductItem from '@/component/ProductItem';
import LoadingComponent from '@/component/LoadingComponent';


const Home = ({ navigation }: any) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res: any = await AxiosInstance(null).get('/products/all');
                setProducts(res);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const visibleData = products.slice(0, 4);
    const visibleData1 = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.bannerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.bannerText}>Planta - toả sáng</Text>
                            <Text style={styles.bannerText}>không gian nhà bạn</Text>
                            <Text style={styles.bannerLink}>
                                Xem hàng mới về{' '}
                                <Image
                                    style={styles.nextIcon}
                                // source={require('../../assets/icons/next.png')}
                                />
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.btnCartContainer}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/shopping-cart.png')}
                            />
                        </TouchableOpacity>
                        <Image source={require('../assets/images/image_9-removebg-preview 1.png')} />
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bannerText}>Thú nuôi</Text>
                    </View>
                    <View style={styles.listPro}>
                        <FlashList
                            data={visibleData}
                            numColumns={2}
                            renderItem={({ item }: any) => (
                                <ProductItem
                                    id={item._id}
                                    image={item.imageUrl}
                                    name={item.name}
                                    attribute={item.attribute}
                                    price={item.price}
                                    navigation={navigation}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.moreContainer}>
                        <TouchableOpacity
                            style={styles.btnSeeMore}
                            onPress={() => {
                                navigation.navigate('Menu');
                            }}>
                            <Text style={styles.btnText}>Xem thêm thú nuôi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bannerText}>Đề xuất</Text>
                    </View>
                    <View style={styles.listPro}>
                        <FlashList
                            data={visibleData1}
                            numColumns={2}
                            renderItem={({ item }: any) => (
                                <ProductItem
                                    id={item._id}
                                    image={item.imageUrl}
                                    name={item.name}
                                    price={item.price}
                                    attribute={item.attribute}
                                    navigation={navigation}
                                />
                            )}
                        />
                    </View>
                    <View style={styles.moreContainer}>
                        <TouchableOpacity
                            style={styles.btnSeeMore}
                            onPress={() => {
                                navigation.navigate('Menu');
                            }}>
                            <Text style={styles.btnText}>Xem thêm thú nuôi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.body}>
                    <Text style={styles.bannerText}>Combo chăm sóc (mới)</Text>
                    <View style={styles.bottomBanner}>
                        <View style={styles.bottomBannerTextBlock}>
                            <Text style={styles.bottomBannerText}>
                                Lemon Balm Grow Kit
                            </Text>
                            <Text>
                                Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker
                                đánh dấu...
                            </Text>
                        </View>
                        <Image source={require('../assets/images/grow-kit-main_540x 1.png')} />
                    </View>
                </View>
            </ScrollView>
            {loading && <LoadingComponent />}
        </Wrapper>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    icon: {
        width: 20,
        height: 20,
    },
    listPro: {
        flex: 1,
        marginHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerContainer: {
        position: 'relative',
        backgroundColor: "#f6f6f6",
        paddingTop: 80,
    },
    textContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    bannerText: {
        fontSize: 24,
        fontWeight: '500',
        color: "#000",
        marginBottom: 10,
    },
    bannerLink: {
        fontSize: 16,
        fontWeight: '500',
        color: "#4CAF50",
    },
    nextIcon: {
        tintColor: "#4CAF50",
        width: 20,
        height: 20,
    },
    btnCartContainer: {
        position: 'absolute',
        top: 50,
        backgroundColor: "#fff",
        right: 20,
        width: 45,
        height: 45,
        borderRadius: '50%',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    moreContainer: {
        alignItems: 'flex-end',
    },
    btnSeeMore: {
        marginBottom: 10,
        marginHorizontal: 20,
    },
    btnText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700"
    },
    bottomBanner: {
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: "#f6f6f6",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    bottomBannerTextBlock: {
        width: '55%',
        marginHorizontal: 20,
    },
    bottomBannerText: {
        color: "#000",
        fontWeight: 'bold',
        fontSize: 18,
    }
});