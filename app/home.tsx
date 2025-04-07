import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, SafeAreaView, } from "react-native";
import ProductComponent from "@/component/product";
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import Wrapper from "@/component/Wrapper";
import taoAxiosInstance from "@/api/sever";


const Home = ({ navigation }: any) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
          setLoading(true);
          try {
            const res: any = await taoAxiosInstance(null).get('/products/all');
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
    //   const visibleData1 = [...products]
    //     .sort(() => Math.random() - 0.5)
    //     .slice(0, 6);


    return (
        <Wrapper>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.bannerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.bannerText}>Planta - tỏa sáng</Text>
                            <Text style={styles.bannerText}>không gian nhà bạn</Text>
                            <Text style={styles.bannerLink}>Xem hàng mới về {"->"}</Text>
                        </View>
                        <TouchableOpacity style={styles.btnCartContainer}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/images/shopping-cart.png')}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../assets/images/image_9-removebg-preview 1.png')}
                        />
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bannerText}>Cây trồng</Text>
                    </View>
                    <View>
                        <FlashList
                            data={visibleData}
                            numColumns={2}
                            renderItem={({ item }: any) => (
                                <ProductComponent
                                    id={item.id}
                                    imageUrl={item.imageUrl}
                                    productName={item.productName}
                                    attribute={item.attribute}
                                    price={item.price}
                                    navigation={navigation}
                                />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        fontSize: 20,
        fontWeight: '400',
        color: "#000",
        marginBottom: 10,
    },
    bannerLink: {
        fontSize: 16,
        fontWeight: '500',
        color: "#007537",
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
    icon: {
        width: 25,
        height: 25,
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    listPro: {
        flex: 1,
        marginHorizontal: 10,
    },
    moreContainer: {
        alignItems: 'flex-end',
    },
    btnSeeMore: {
        marginBottom: 10,
        marginHorizontal: 20,
    },
    btnText: {
        color: "#4CAF50",
        fontSize: 18,
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
    },

});

export default Home;